import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Thread, ThreadSchema } from 'src/modules/thread/schema/thread.schema';
import { ThreadService } from './services/thread.service';
import { ThreadController } from './controllers/thread.controller';
import { OpenAIProvider } from '../messages/providers/openai.provider';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Thread.name, schema: ThreadSchema }]),
  ],
  controllers: [ThreadController],
  providers: [ThreadService, OpenAIProvider],
  exports: [MongooseModule],
})
export class ThreadModule {}
