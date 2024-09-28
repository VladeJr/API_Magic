import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DeckModule } from './deck/modules/deck.module';
import { UsersModule } from './user/users.module';
import { CacheModule } from '@nestjs/cache-manager/dist/cache.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/api-magic'),
    AuthModule,
    UsersModule,
    DeckModule,
    CacheModule.register({
      ttl: 300,
      max: 100,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
