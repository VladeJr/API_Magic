import { model, Document, Schema } from 'mongoose';

export interface Deck extends Document {
  userId: { type: string; required: true };
  commander: string;
  cards: string[];
}

export const DeckSchema = new Schema<Deck>({
  commander: { type: String, required: true },
  cards: {
    type: [String],
    required: true,
    validate: [arrayLimit, 'deve conter 99 cartas'],
  },
});

function arrayLimit(val: string[]) {
  return val.length === 99;
}
const DeckModel = model<Deck>('Deck', DeckSchema);

export default DeckModel;
