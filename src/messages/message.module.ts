import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Messages,
  MessageSchema,
} from 'src/schema/conversation/message.schema';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Messages.name, schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    {
      provide: OpenAI,
      useFactory: (configModule: ConfigService) =>
        new OpenAI({ apiKey: configModule.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
  exports: [MongooseModule],
})
export class MessageModule {}
