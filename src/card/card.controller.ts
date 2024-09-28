import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  async createCard(@Body() cardData: any) {
    return this.cardService.createCard(cardData);
  }

  @Get()
  async findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.cardService.findById(id);
  }

  @Put(':id')
  async updateCard(@Param('id') id: string, @Body() cardData: any) {
    return this.cardService.updateCard(id, cardData);
  }
}
