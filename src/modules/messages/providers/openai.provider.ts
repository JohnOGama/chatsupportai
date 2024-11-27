import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';
import { Provider } from '@nestjs/common';

export const OpenAIProvider: Provider = {
  provide: OpenAI,
  useFactory: (configService: ConfigService) => {
    const apiKey = configService.getOrThrow<string>('OPENAI_API_KEY');
    return new OpenAI({ apiKey });
  },
  inject: [ConfigService],
};
