import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import { Thread, ThreadSchema } from 'src/schema/thread/thread.schema';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }]),
  ],
  controllers: [ThreadController],
  providers: [
    ThreadService,
    {
      provide: OpenAI,
      useFactory: (configModule: ConfigService) =>
        new OpenAI({ apiKey: configModule.getOrThrow('OPENAI_API_KEY') }),
      inject: [ConfigService],
    },
  ],
  exports: [MongooseModule],
})
export class ThreadModule {}
