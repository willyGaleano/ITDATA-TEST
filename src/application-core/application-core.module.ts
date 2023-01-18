import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  FindCardInteractor,
  GenerateTokenInteractor,
  TokenizationUtil,
} from './tokenization';

const services = [
  TokenizationUtil,
  FindCardInteractor,
  GenerateTokenInteractor,
];

@Module({
  imports: [
    InfrastructureModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '60s',
          },
        };
      },
    }),
  ],
  providers: services,
  exports: services,
})
export class ApplicationCoreModule {}
