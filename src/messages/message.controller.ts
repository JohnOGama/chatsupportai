import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from 'src/dto/message.dto';
import { MessageContentDto } from 'src/dto/SaveMessage.dto';
import { Messages } from 'src/schema/conversation/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async sendMessage(
    @Body() data: MessageDto,
  ): Promise<GenericResponse<Messages>> {
    const { content, userID } = data;
    return await this.messageService.createMessage(content, userID);
  }

  @Get(':threadID')
  async getOneThread(@Param('threadID') threadID: string) {
    return await this.messageService.findByThreadID(threadID);
  }

  @Get()
  async getThreads(): Promise<GenericResponse<Messages[]>> {
    return await this.messageService.find();
  }

  @Put(':threadID')
  async updateThread(
    @Param('threadID') threadID: string,
    newMessage: MessageContentDto,
  ) {
    try {
      const updateThread = await this.messageService.findByThreadIDAndUpdate(
        threadID,
        newMessage,
      );
      return updateThread;
    } catch (error) {
      console.log('error in update thread');
      throw error;
    }
  }

  @Delete(':threadID')
  async deleteThread(@Param('threadID') threadID: string) {
    return this.messageService.findByThreadIDAndDelete(threadID);
  }
}
