import { Module } from '@nestjs/common';
import { ApplicationCoreModule } from 'src/application-core/application-core.module';
import { CardController } from './controllers/card.controller';
@Module({
  imports: [ApplicationCoreModule],
  controllers: [CardController],
})
export class UserInterfaceModule {}
