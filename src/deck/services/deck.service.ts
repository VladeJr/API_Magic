import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Deck } from '../models/deck.model';
import * as fs from 'fs';
import * as path from 'path';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ImportDeckDto } from '../dtos/import-deck.dto';

@Injectable()
export class DeckService {
  constructor(
    @InjectModel('Deck') private readonly deckModel: Model<Deck>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createDeck(commanderId: string, userId: string) {
    try {
      const commanderResponse = await axios.get(
        `https://api.magicthegathering.io/v1/cards/${commanderId}`,
      );
      const commanderCard = commanderResponse.data.card;
      const commanderTypes = commanderCard.types.join(', ');
      const cardsResponse = await axios.get(
        `https://api.magicthegathering.io/v1/cards?types=${encodeURIComponent(commanderTypes)}&pageSize=99`,
      );
      const cards = cardsResponse.data.cards;

      if (!cards || cards.length !== 99) {
        throw new Error(
          'Erro: Não foi possível completar o deck com 99 cartas.',
        );
      }

      const deck = {
        commander: commanderCard.id,
        cards: cards.map((card: any) => card.id),
        userId: userId,
      };

      const decksDir = path.join(__dirname, '..', 'decks-importados');
      const jsonFilePath = path.join(decksDir, `deck_${commanderId}.json`);

      if (!fs.existsSync(decksDir)) {
        fs.mkdirSync(decksDir);
      }

      const cardsData = {
        commander: commanderCard,
        cards: cards,
      };
      fs.writeFileSync(
        jsonFilePath,
        JSON.stringify(cardsData, null, 2),
        'utf-8',
      );

      const createdDeck = await this.deckModel.create(deck);
      return createdDeck;
    } catch (error) {
      throw new Error('Erro ao montar e salvar o deck: ' + error.message);
    }
  }

  async findUserDecks(userId: string) {
    const cacheKey = `user_decks_${userId}`;
    const cachedDecks = await this.cacheManager.get<Deck[]>(cacheKey);
    if (cachedDecks) {
      return cachedDecks;
    }
    const decks = await this.deckModel.find({ userId }).exec();
    await this.cacheManager.set(cacheKey, decks, 300);

    return decks;
  }
  async importDeck(importDeckDto: ImportDeckDto, userId: string) {
    const { commander, cards } = importDeckDto;
    if (cards.length !== 99) {
      throw new Error('Erro: O deck deve conter exatamente 99 cartas.');
    }
    const commanderResponse = await axios.get(
      `https://api.magicthegathering.io/v1/cards/${commander}`,
    );
    const commanderCard = commanderResponse.data.card;
    if (!commanderCard) {
      throw new Error('Erro: Commander não encontrado.');
    }
    const commanderColors = commanderCard.colors || [];
    const cardTypesResponses = await Promise.all(
      cards.map((cardId) =>
        axios.get(`https://api.magicthegathering.io/v1/cards/${cardId}`),
      ),
    );
    const allCardsValid = cardTypesResponses.every((response) => {
      const card = response.data.card;
      return (
        card.colors &&
        commanderColors.length > 0 &&
        card.colors.some((color) => commanderColors.includes(color))
      );
    });

    if (!allCardsValid) {
      throw new Error(
        'Erro: Todas as cartas devem ter pelo menos uma cor igual à do commander.',
      );
    }
    const deck = {
      commander: commanderCard.id,
      cards: cards,
      userId: userId,
    };
    const createdDeck = await this.deckModel.create(deck);
    return createdDeck;
  }

  async findDecks() {
    return this.deckModel.find();
  }
}
