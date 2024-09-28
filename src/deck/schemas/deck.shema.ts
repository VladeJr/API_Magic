import { Schema, Document } from 'mongoose';

export interface Deck extends Document {
  commander: string;
  cards: string[];
}

export const DeckSchema = new Schema<Deck>({
  commander: { type: String, required: true },
  cards: {
    type: [String],
    required: true,
    validate: [arrayLimit, '{PATH} deve conter 99 cartas'],
  },
});

function arrayLimit(val: string[]) {
  return val.length === 99;
}
