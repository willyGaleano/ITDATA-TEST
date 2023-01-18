import { Test } from '@nestjs/testing';
import { FindCardInteractor } from '../../../src/application-core/tokenization/use-cases/findCard.interactor';
import { CardGateway } from '../../../src/infrastructure/persistence/gateways/card.gateway';
import { TokenizationUtil } from '../../../src/application-core/tokenization/utils/tokenization.util';
describe('FinCardInteractor', () => {
  let findCardInteractor: FindCardInteractor;

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGxpYW1zQGdtYWlsLmNvbSIsImNhcmRfbnVtYmVyIjo0MTExMTExMTExMTExMTExLCJjdnYiOjIxOSwiZXhwaXJhdGlvbl9tb250aCI6IjA5IiwiZXhwaXJhdGlvbl95ZWFyIjoiMjAyNSIsImlhdCI6MTY3NDA3NzQxMCwiZXhwIjoxNjc0MDc3NDcwfQ.WrwcLwleqGz8r3W_wYDacidCbJtPggxkUAtZWu3Mios';
  const util = {
    verifyJwtToken: () => {
      return {};
    },
  };

  const gatewayCard = {
    findOne: async () => ({
      email: 'williams@gmail.com',
      card_number: 4111111111111111,
      expiration_month: '09',
      expiration_year: '2025',
      token,
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CardGateway, FindCardInteractor, TokenizationUtil],
    })
      .overrideProvider(CardGateway)
      .useValue(gatewayCard)
      .overrideProvider(TokenizationUtil)
      .useValue(util)
      .compile();

    findCardInteractor = moduleRef.get<FindCardInteractor>(FindCardInteractor);
  });

  describe('find card', () => {
    it('should return data', async () => {
      const response = await findCardInteractor.execute(token);
      expect(response.data).not.toBe(null);
    });
    it('should return data', async () => {
      const response = await findCardInteractor.execute('123');
      expect(response.data).not.toBe(null);
    });
  });
});
