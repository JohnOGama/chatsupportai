import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from './messages/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './messages/message.service';

import OpenAI from 'openai';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_KEY),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MessageService,
    {
      provide: OpenAI,
      useFactory: (configModule: ConfigService) =>
        new OpenAI({ apiKey: configModule.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
  exports: [MongooseModule, MessageService],
})
export class AppModule {}
