import { Controller, Get, Param } from '@nestjs/common';
import { ThreadService } from '../services/thread.service';

@Controller('thread')
export class ThreadController {
  constructor(private readonly threadService: ThreadService) {}

  @Get()
  async generateThread() {
    return await this.threadService.createThread();
  }

  @Get('/all')
  async fetchThreads() {
    return await this.threadService.find();
  }

  @Get(':threadID')
  async fetchThread(@Param('threadID') threadID: string) {
    return this.threadService.findThreadByThreadId(threadID);
  }
}
