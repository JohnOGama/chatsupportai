import {
  IsString,
  IsArray,
  IsDate,
  ValidateNested,
  IsIn,
  IsObject,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class MetadataDto {
  @IsString()
  @IsOptional()
  sentiment: string;

  @IsNumber()
  @IsOptional()
  length: number;
}

export class MessageContentDto {
  @IsString()
  sender: string;

  @IsString()
  content: string;

  // @IsObject()
  // @ValidateNested()
  // @Type(() => MetadataDto)
  // metadata: MetadataDto;
}

export class SaveMessageDto {
  @IsString()
  userID: string;

  @IsString()
  agentID: string;

  @IsString()
  threadID: string;

  @IsArray()
  @IsObject()
  messages: MessageContentDto;
}
