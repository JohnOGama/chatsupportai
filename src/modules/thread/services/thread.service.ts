import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import OpenAI from 'openai';
import { Thread } from 'src/modules/thread/schema/thread.schema';

@Injectable()
export class ThreadService {
  constructor(
    @InjectModel(Thread.name) private readonly threadModel: Model<Thread>,
    private readonly openaiService: OpenAI,
  ) {}

  async createThread() {
    const thread = await this.openaiService.beta.threads.create();

    const payload = {
      threadID: thread.id,
      object: thread.object,
    };

    return await this.threadModel.create(payload);
  }

  async find() {
    return await this.threadModel.find();
  }

  async findThreadByThreadId(threadID: string) {
    return await this.threadModel.findOne({ threadID });
  }
}
