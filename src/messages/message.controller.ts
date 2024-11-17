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

  @Post(':userID')
  async sendMessage(
    @Body() message: MessageDto,
    @Param() userID: string,
  ): Promise<Messages> {
    const { content } = message;

    return this.messageService.createMessage(content, userID);
  }

  @Get(':threadID')
  async getOneThread(@Param() threadID: string) {
    return await this.messageService.findByThreadID(threadID);
  }

  @Put(':threadID')
  async updateThread(@Param() threadID: string, newMessage: MessageContentDto) {
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
  async deleteThread(@Param() threadID: string) {
    return this.messageService.findByThreadIDAndDelete(threadID);
  }
}
