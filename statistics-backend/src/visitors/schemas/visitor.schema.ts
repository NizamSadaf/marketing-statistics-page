/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Visitor extends Document {
  @Prop({ required: true })
  ip: string;

  // eslint-disable-next-line prettier/prettier
  @Prop({ default: Date.now })
  timestamp: Date;
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor);
