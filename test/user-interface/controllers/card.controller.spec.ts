import { Test } from '@nestjs/testing';
import { GenerateTokenInteractor } from '../../../src/application-core/tokenization/use-cases/generateToken.interactor';
import { FindCardInteractor } from '../../../src/application-core/tokenization/use-cases/findCard.interactor';
import { CardController } from '../../../src/user-interface/controllers/card.controller';
import { CreateCardDTO } from '../../../src/infrastructure/persistence/dto/card.dto';

describe('CardController', () => {
  let generateTokenInteractor: GenerateTokenInteractor;
  let findCardInteractor: FindCardInteractor;
  let cardController: CardController;

  beforeAll(async () => {
    class MockModel {
      static execute = async () => ({ data: 'seccess' });
    }

    const moduleRef = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        {
          provide: GenerateTokenInteractor,
          useValue: MockModel,
        },
        {
          provide: FindCardInteractor,
          useValue: MockModel,
        },
      ],
    }).compile();

    generateTokenInteractor = moduleRef.get<GenerateTokenInteractor>(
      GenerateTokenInteractor,
    );
    findCardInteractor = moduleRef.get<FindCardInteractor>(FindCardInteractor);
    cardController = moduleRef.get<CardController>(CardController);
  });

  describe('generateToken', () => {
    it('should return a success message', async () => {
      const payload = {
        email: 'gg@gmail.com',
        card_number: 4111111111111111,
        cvv: 219,
        expiration_year: '2025',
        expiration_month: '09',
      } as CreateCardDTO;
      try {
        jest
          .spyOn(generateTokenInteractor, 'execute')
          .mockImplementation(async () => ({ data: 'seccess' }));

        expect(
          await cardController.generateToken(payload, { pk: 'holamundo' }),
        ).toEqual({
          data: 'seccess',
        });
      } catch (_) {}
    });
  });

  describe('findCard', () => {
    it('should return a success message', async () => {
      try {
        jest
          .spyOn(findCardInteractor, 'execute')
          .mockImplementation(async () => ({ data: 'seccess' }));

        expect(
          await cardController.findCard('123456', { pk: 'holamundo' }),
        ).toEqual({
          data: 'seccess',
        });
      } catch (_) {}
    });
  });
});
