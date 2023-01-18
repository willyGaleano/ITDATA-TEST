import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './schema/card.schema';
import { CardGateway } from './gateways/card.gateway';
const services = [CardGateway];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Card.name,
        schema: CardSchema,
      },
    ]),
  ],
  providers: services,
  exports: services,
})
export class PersistenceModule {}
