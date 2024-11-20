import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import OpenAI from 'openai';
import { SaveMessageDto } from 'src/dto/SaveMessage.dto';
import { Messages } from 'src/schema/conversation/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Messages.name)
    private messageModel: Model<Messages>,
    private readonly openai: OpenAI,
  ) {}

  async createThread() {
    return this.openai.beta.threads.create();
  }
  async retriveThread(threadID: string) {
    return this.openai.beta.threads.retrieve(threadID);
  }

  async createMessage(message: string, userID: string, threadID: string) {
    const agentID = process.env.AGENT_ID;

    try {
      if (userID) {
        const response = await this.openai.beta.threads.messages.create(
          threadID,
          {
            role: 'user',
            content: message,
          },
        );
        const saveMessage = await this.saveMessageToDB({
          userID,
          agentID,
          threadID,
          messages: { sender: 'user', content: message },
        });
        if (response.id) {
          return await this.runThread(threadID, agentID, userID);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async runThread(threadID: string, agentID: string, userID: string) {
    try {
      const run = await this.openai.beta.threads.runs.createAndPoll(threadID, {
        assistant_id: agentID,
      });

      if (run.status === 'completed') {
        const messagesResponse =
          await this.openai.beta.threads.messages.list(threadID);

        const payload = {
          userID,
          agentID,
          threadID,
          messages: {
            sender: 'agent',
            // @ts-ignore
            content: messagesResponse.data[0].content[0]?.text?.value,
          },
        };

        const aiResponse = await this.messageModel.create(payload);

        return {
          status_code: HttpStatus.OK,
          data: aiResponse,
        };
      }
    } catch (error) {
      console.log('error in run thread');
      throw error;
    }
  }

  async saveMessageToDB(saveMessageDto: SaveMessageDto): Promise<Messages> {
    try {
      const message = new this.messageModel(saveMessageDto);
      return message.save();
    } catch (error) {
      console.error('Error saving message:', error);
      throw new Error('Failed to save message to the database.');
    }
  }

  async findByThreadID(threadID: string): Promise<Messages[]> {
    try {
      return await this.messageModel.find({ threadID }).exec();
    } catch (error) {
      throw new Error('Error getting thread');
    }
  }

  async findByThreadIDAndDelete(threadID: string) {
    try {
      return this.messageModel.deleteMany({ threadID }).exec();
    } catch (error) {
      throw new Error('Error deleting thread');
    }
  }

  async find(): Promise<GenericResponse<Messages[]>> {
    try {
      const data = await this.messageModel.find().exec();
      return {
        status_code: HttpStatus.OK,
        data,
      };
    } catch (error) {
      throw new Error('Error getting all messages/threads');
    }
  }
}
