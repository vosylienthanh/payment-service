import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProcessOrders, ProcessOrdersSchema } from '../../schemas';
import { ProcessOrdersController } from './process-orders.controller';
import { ProcessOrdersRepository } from './process-orders.repository';
import { ProcessOrdersService } from './process-orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProcessOrders.name,
        schema: ProcessOrdersSchema,
      },
    ]),
  ],
  providers: [ProcessOrdersRepository, ProcessOrdersService],
  controllers: [ProcessOrdersController],
  exports: [ProcessOrdersService],
})
export class ProcessOrdersModule {}
