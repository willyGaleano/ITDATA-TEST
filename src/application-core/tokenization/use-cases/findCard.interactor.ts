import { Injectable } from '@nestjs/common';
import { TokenizationUtil } from '../utils/tokenization.util';
import { ResponseDTO } from '../dto/index';
import { CreateCardDTO } from '../../../infrastructure/persistence/dto/card.dto';
import { CardGateway } from '../../../infrastructure/persistence/gateways/card.gateway';

@Injectable()
export class FindCardInteractor {
  constructor(
    private readonly cardGateway: CardGateway,
    private readonly tokenizationUtil: TokenizationUtil,
  ) {}

  async execute(cardToken: string): Promise<ResponseDTO> {
    try {
      const card = await this.cardGateway.findOne({ token: cardToken });

      if (!card) {
        throw new Error('Card not found');
      }

      const token = this.tokenizationUtil.verifyJwtToken(cardToken);

      return {
        data: {
          email: token.email,
          card_number: token.card_number,
          expiration_month: token.expiration_month,
          expiration_year: token.expiration_year,
          token: cardToken,
        } as CreateCardDTO,
        message: 'Card found',
      };
    } catch (error) {
      return {
        error,
        message: error.message,
      };
    }
  }
}
