import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import mongoose, { Document } from 'mongoose';

@Schema()
class Metadata {
  @Prop({ required: false })
  sentiment: string;

  @Prop({ required: false })
  length: number;
}

export const MetadataSchema = SchemaFactory.createForClass(Metadata);

@Schema()
class Message {
  @Prop()
  sender: string;

  @Prop()
  content: string;

  // @Prop()
  // @IsOptional()
  // metadata: Metadata;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

@Schema({ timestamps: true })
export class Messages {
  @Prop()
  userID: string;

  @Prop()
  agentID: string;

  @Prop()
  threadID: string;

  @Prop({ type: MessageSchema })
  messages: Message;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
