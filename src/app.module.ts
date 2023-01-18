import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './infrastructure/configuration/env/config';
import { JoiValidationSchema } from './infrastructure/configuration/env/joi.validation';
import { UserInterfaceModule } from './user-interface/user-interface.module';
import { ApplicationCoreModule } from './application-core/application-core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    UserInterfaceModule,
    ApplicationCoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
