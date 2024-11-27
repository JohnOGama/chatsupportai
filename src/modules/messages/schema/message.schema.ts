import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class Message {
  @Prop()
  sender: string;

  @Prop()
  content: string;
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

  @Prop()
  messages: Message;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
