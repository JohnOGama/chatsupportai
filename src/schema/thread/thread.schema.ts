import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Thread {
  @Prop({ required: true, unique: true })
  threadID: string;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
