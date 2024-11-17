import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import OpenAI from 'openai';
import { SaveMessageDto } from 'src/dto/SaveMessage.dto';
import { Messages } from 'src/schema/conversation/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Messages.name)
    private readonly messageModel: Model<Messages>,
    private readonly openai: OpenAI,
  ) {}

  async createThread() {
    return this.openai.beta.threads.create();
  }

  async createMessage(message: string, userID: string) {
    const agentID = 'asst_6dyw8BP3jizOPQ4t15P8Vn9K';
    const threadID = 'thread_1VFfuwfqAdzxvfbLN3ZLz5Lb';

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
          messages: { content: message, sender: 'user' },
        });
        if (response.id) {
          return await this.runThread(threadID, agentID, userID);
        }
        return saveMessage;
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

        const aiResponse = await this.saveMessageToDB({
          userID,
          agentID,
          threadID,
          messages: {
            // @ts-ignore
            content: messagesResponse.data[0].content?.text?.value,
            sender: 'agent',
          },
        });

        console.log('ai response ', aiResponse);
        return aiResponse;
      }
    } catch (error) {
      console.log('error in run thread');
      throw error;
    }
  }

  async saveMessageToDB(saveMessageDto: SaveMessageDto): Promise<Messages> {
    try {
      const message = new this.messageModel(saveMessageDto);
      const savedMessage = await message.save();

      console.log('Saved message:', savedMessage);

      return savedMessage;
    } catch (error) {
      console.error('Error saving message:', error);
      throw new Error('Failed to save message to the database.');
    }
  }

  async findByThreadID(threadId: string) {
    return this.messageModel.findOne({ threadId }).exec();
  }

  async findByThreadIDAndUpdate(threadId: string, data: any) {
    const threadData = await this.findByThreadID(threadId);
    return this.messageModel.findByIdAndUpdate(
      { threadId },
      { threadData, messages: threadData.messages, ...data },
    );
  }

  async findByThreadIDAndDelete(threadID: string) {
    return this.messageModel.findByIdAndDelete({ threadID });
  }

  
}
