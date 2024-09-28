import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Request,
} from '@nestjs/common';
import { DeckService } from '../services/deck.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ImportDeckDto } from '../dtos/import-deck.dto';

@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}
  @UseGuards(JwtAuthGuard)
  @Post('build')
  async buildDeck(@Body('commanderId') commanderId: string, @Req() req) {
    return this.deckService.createDeck(commanderId, req.user._Id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find_decks')
  async findDecks() {
    return this.deckService.findDecks();
  }

  @CacheKey('deck')
  @UseGuards(JwtAuthGuard)
  @CacheTTL(300)
  @Get('user_decks')
  async getUserDecks(@Req() req) {
    const userId = req.user.userId;
    return this.deckService.findUserDecks(userId);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard)
  async importDeck(@Body() importDeckDto: ImportDeckDto, @Request() req) {
    const userId = req.user.userId;
    return this.deckService.importDeck(importDeckDto, userId);
  }
}
