import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckController } from '../controllers/deck.controller';
import { DeckSchema } from '../models/deck.model';
import { DeckService } from '../services/deck.service';
import { CardModule } from 'src/card/card.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Deck', schema: DeckSchema }]),
    CardModule,
    CacheModule.register(),
  ],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
