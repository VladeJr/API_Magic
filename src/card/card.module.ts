import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Card, CardSchema } from './card.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService], // Exporte o serviço
})
export class CardModule {}
