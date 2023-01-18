import {
  Body,
  Controller,
  Post,
  Headers,
  Query,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { GenerateTokenInteractor } from './../../application-core/tokenization/use-cases/generateToken.interactor';
import { FindCardInteractor } from '../../application-core/tokenization/use-cases/findCard.interactor';
import { CreateCardDTO } from '../../infrastructure/persistence/dto/card.dto';

@Controller()
export class CardController {
  constructor(
    private readonly generateTokenInteractor: GenerateTokenInteractor,
    private readonly findCardInteractor: FindCardInteractor,
  ) {}

  @Post('v1/card/generate-token')
  async generateToken(
    @Body() body: CreateCardDTO,
    @Headers() headers: any,
  ): Promise<any> {
    if (!headers.pk) {
      throw new BadRequestException('Missing pk header');
    }
    const response = await this.generateTokenInteractor.execute(body);

    if (response.error) {
      throw new BadRequestException(response);
    }
    return response;
  }

  @Get('v1/card/find')
  async findCard(
    @Query('token') cardToken: string,
    @Headers() headers: any,
  ): Promise<any> {
    if (!headers.pk) {
      throw new BadRequestException('Missing pk header');
    }

    const response = await this.findCardInteractor.execute(cardToken);

    if (response.error) {
      throw new BadRequestException(response);
    }
    return response;
  }
}
