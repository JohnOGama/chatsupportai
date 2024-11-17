import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop()
  metadata: Metadata;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

@Schema({ timestamps: true })
export class Messages extends Document {
  @Prop({ required: true })
  userID: string;

  @Prop({ required: true })
  agentID: string;

  @Prop({ required: true })
  threadID: string;

  @Prop()
  messages: Message;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
