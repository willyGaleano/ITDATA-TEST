import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ type: Number })
  card_number: number;

  @Prop({ type: Number })
  cvv: number;

  @Prop({ type: String })
  expiration_month: string;

  @Prop({ type: String })
  expiration_year: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  token: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
