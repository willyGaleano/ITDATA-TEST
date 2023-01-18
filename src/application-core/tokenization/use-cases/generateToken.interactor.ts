import { Injectable } from '@nestjs/common';
import { TokenizationUtil } from '../utils/tokenization.util';
import { ResponseDTO } from '../dto/index';
import { CardGateway } from '../../../infrastructure/persistence/gateways/card.gateway';
import { CreateCardDTO } from '../../../infrastructure/persistence/dto/card.dto';

@Injectable()
export class GenerateTokenInteractor {
  constructor(
    private readonly cardGateway: CardGateway,
    private readonly tokenizationUtil: TokenizationUtil,
  ) {}

  async execute(payload: CreateCardDTO): Promise<ResponseDTO> {
    try {
      const { email, card_number, cvv, expiration_month, expiration_year } =
        payload;

      const errors = this.tokenizationUtil.validationCard(payload);
      if (errors.length > 0) {
        throw new Error(errors.join(' '));
      }
      const cardTemp = {
        ...payload,
        token: this.tokenizationUtil.getJwtToken({
          email,
          card_number,
          cvv,
          expiration_month,
          expiration_year,
        }),
      };

      const card = await this.cardGateway.create(cardTemp);

      return {
        data: {
          email: card.email,
          card_number: card.card_number,
          expiration_month: card.expiration_month,
          expiration_year: card.expiration_year,
          token: card.token,
        },
        message: 'Card created successfully',
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}
