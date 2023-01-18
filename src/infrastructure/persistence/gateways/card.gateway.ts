import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from '../schema/card.schema';
import { CreateCardDTO } from '../dto/card.dto';

@Injectable()
export class CardGateway {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async findOne(findCardDTO: CreateCardDTO): Promise<CardDocument> {
    return this.cardModel.findOne({
      ...findCardDTO,
    });
  }

  async create(createCardDTO: CreateCardDTO): Promise<CardDocument> {
    const model = new this.cardModel(createCardDTO);
    return model.save();
  }
}
