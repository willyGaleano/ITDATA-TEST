import { Test } from '@nestjs/testing';
import { CardGateway } from '../../../src/infrastructure/persistence/gateways/card.gateway';
import { TokenizationUtil } from '../../../src/application-core/tokenization/utils/tokenization.util';
import { GenerateTokenInteractor } from '../../../src/application-core/tokenization/use-cases/generateToken.interactor';
describe('GenerateTokenInteractor', () => {
  let generateTokenInteractor: GenerateTokenInteractor;

  const util = {
    validationCard: ({}) => {
      return [];
    },
  };

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IndpbGxpYW1zQGdtYWlsLmNvbSIsImNhcmRfbnVtYmVyIjo0MTExMTExMTExMTExMTExLCJjdnYiOjIxOSwiZXhwaXJhdGlvbl9tb250aCI6IjA5IiwiZXhwaXJhdGlvbl95ZWFyIjoiMjAyNSIsImlhdCI6MTY3NDA3NzQxMCwiZXhwIjoxNjc0MDc3NDcwfQ.WrwcLwleqGz8r3W_wYDacidCbJtPggxkUAtZWu3Mios';
  const gatewayCard = {
    create: async () => ({
      email: 'williams@gmail.com',
      card_number: 4111111111111111,
      expiration_month: '09',
      expiration_year: '2025',
      token,
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CardGateway, GenerateTokenInteractor, TokenizationUtil],
    })
      .overrideProvider(CardGateway)
      .useValue(gatewayCard)
      .overrideProvider(TokenizationUtil)
      .useValue(util)
      .compile();

    generateTokenInteractor = moduleRef.get<GenerateTokenInteractor>(
      GenerateTokenInteractor,
    );
  });

  describe('generate token', () => {
    it('should return data', async () => {
      const response = await generateTokenInteractor.execute({});
      expect(response.data).not.toBe(null);
    });
    it('should return data', async () => {
      const response = await generateTokenInteractor.execute({});
      expect(response.data).not.toBe(null);
    });
  });
});
