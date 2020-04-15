import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producer } from './interfaces/producer.interface';
import { CreateProducerDto } from './dto/create-producer.dto';

@Injectable()
export class ProducerService {
  constructor(@InjectModel('Producer') private producerModel: Model<Producer>) {}

  async create(createProducerDto: CreateProducerDto): Promise<Producer> {
    const createdProducer = new this.producerModel(createProducerDto);
    return createdProducer.save();
  }

  async findAll(): Promise<Producer[]> {
    return this.producerModel.find().exec();
  }
}