import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { OpenAIProvider } from './providers/openai.provider';
import { Messages, MessagesSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Messages.name, schema: MessagesSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, OpenAIProvider],
  exports: [MongooseModule],
})
export class MessageModule {}
