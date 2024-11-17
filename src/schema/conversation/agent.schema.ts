import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Agents extends Document {
  @Prop({ required: true, unique: true })
  agentID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;
}

export const AgentsSchema = SchemaFactory.createForClass(Agents);
