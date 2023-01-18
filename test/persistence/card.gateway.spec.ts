import { CardGateway } from '../../src/infrastructure/persistence/gateways/card.gateway';
import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Card } from '../../src/infrastructure/persistence/schema/card.schema';
describe('CardGateway', () => {
  let cardGateway: CardGateway;

  function mockRepository(dto: any) {
    this.data = dto;
    this.save = () => {
      return this.data;
    };
  }

  mockRepository.findOne = () => {
    return {
      updateOne: jest.fn(),
    };
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CardGateway,
        {
          provide: getModelToken(CardGateway.name),
          useValue: mockRepository,
        },
        {
          provide: getModelToken(Card.name),
          useValue: mockRepository,
        },
      ],
      imports: [],
    }).compile();

    cardGateway = module.get<CardGateway>(CardGateway);
  });

  describe('findOne', () => {
    it('should return a leg stored in the database by any props', async () => {
      const response = await cardGateway.findOne({});
      expect(response).not.toBe(null);
    });
  });

  describe('create', () => {
    it('should create and return a leg in the database ', async () => {
      const response = await cardGateway.create({});
      expect(response).not.toBe(null);
    });
  });
});
