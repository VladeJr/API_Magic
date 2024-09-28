import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from './card.model';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async createCard(cardData: any) {
    const newCard = new this.cardModel(cardData);
    return newCard.save();
  }

  async findAll() {
    return this.cardModel.find().exec();
  }

  async findById(id: string) {
    return this.cardModel.findById(id).exec();
  }

  async updateCard(id: string, cardData: any) {
    return this.cardModel.findByIdAndUpdate(id, cardData, { new: true }).exec();
  }
}
