import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Delivery } from './interfaces/delivery.interface';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { ProducerService } from './../producer/producer.service';
import { DeliverersService } from './../deliverer/deliverers.service';

@Injectable()
export class DeliveryService {
  constructor(@InjectModel('Delivery') private deliveryModel: Model<Delivery>, private deliverersService: DeliverersService, private producerService: ProducerService) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<{result: string, message: string}> {
    const producer = await this.producerService.findOne(createDeliveryDto.idProducer);
    const deliverer = await this.deliverersService.findOne(createDeliveryDto.idDeliverer)
    if(!producer || !deliverer) {
      return { result: 'error', message: 'Can\'t find producer or delivered given.' }
    }
    const objectDelivery = {
      collectionAddress: createDeliveryDto.collectionAddress,
      weight: createDeliveryDto.weight,
      createdAt: new Date(),
      updatedAt: new Date(),
      deliveryAddress: createDeliveryDto.deliveryAddress,
      clientPhoneNumber: createDeliveryDto.clientPhoneNumber,
      producer: producer,
      deliverer: deliverer,
      isDelivered: false,
      isPending: true
     }
    const createdDelivery = new this.deliveryModel(objectDelivery);
    createdDelivery.save();
    return { result: 'ok', message: 'Producer inserted' };
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveryModel.find().exec();
  }

  async findOne(id: string): Promise<Delivery> {
    return this.deliveryModel.findById(id).exec();
  }

  async updateOne(id: string, createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveryModel.updateOne({_id: id}, createDeliveryDto).exec();
  }

  async deleteOne(id: string) {
    return this.deliveryModel.deleteOne({_id: id});
  }
}
