import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliverersModule } from './deliverer/deliverers.module';
import { ProducerModule } from './producer/producer.module';
import { DeliveryModule } from './delivery/delivery.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pap-back'),
    DeliverersModule,
    ProducerModule,
    DeliveryModule,
    AuthModule,
  ],
})
export class AppModule {}
