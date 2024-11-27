import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { MessageService } from '../services/message.service';
import { MessageDto } from '../dtos/message.dto';
import { Messages } from '../schema/message.schema';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // create new thread for thread id
  @Post(':threadID')
  async sendMessage(
    @Body() data: MessageDto,
    @Param('threadID') threadID: string,
  ): Promise<GenericResponse<Messages>> {
    const { content, userID } = data;
    return await this.messageService.createMessage(content, userID, threadID);
  }

  @Get(':threadID')
  async getOneThread(@Param('threadID') threadID: string) {
    try {
      const thread = await this.messageService.findByThreadID(threadID);
      if (!thread) {
        throw new NotFoundException(`Thread with ID ${threadID} not found.`);
      }
      return thread;
    } catch (error) {
      console.error('Error in getOneThread:', error.message);
      throw error;
    }
  }

  @Get()
  async getThreads(): Promise<GenericResponse<Messages[]>> {
    return await this.messageService.find();
  }

  @Delete(':threadID')
  async deleteThread(@Param('threadID') threadID: string) {
    return this.messageService.findByThreadIDAndDelete(threadID);
  }
}
