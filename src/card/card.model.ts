import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Card extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  manaCost: string;

  @Prop()
  cmc: number;

  @Prop({ type: [String] }) // Array de cores
  colors: string[];

  @Prop({ type: [String] }) // Array de identidade de cores
  colorIdentity: string[];

  @Prop()
  type: string;

  @Prop({ type: [String] }) // Array de tipos
  types: string[];

  @Prop()
  rarity: string;

  @Prop()
  setName: string;

  @Prop()
  text: string;

  @Prop()
  flavor: string;

  @Prop()
  artist: string;

  @Prop()
  number: string;

  @Prop()
  layout: string;

  @Prop()
  multiverseid: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [Object] }) // Array de rulings
  rulings: object[];

  @Prop({ type: [String] }) // Array de impressões
  printings: string[];

  @Prop()
  originalText: string;

  @Prop()
  originalType: string;

  @Prop({ type: [Object] }) // Array de legalities
  legalities: object[];

  @Prop()
  id: string;
}

export const CardSchema = SchemaFactory.createForClass(Card);
