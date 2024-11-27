import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThreadModule } from './modules/thread/thread.module';
import { ThreadService } from './modules/thread/services/thread.service';
import { MessageService } from './modules/messages/services/message.service';
import { MessageModule } from './modules/messages/message.module';
import { OpenAIProvider } from './modules/messages/providers/openai.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_KEY),
    MessageModule,
    ThreadModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageService, ThreadService, OpenAIProvider],
})
export class AppModule {}
