import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { ProcessOrders, ProcessOrdersDocument } from '../../schemas';
import { IProcessOrders } from './interfaces/process-orders.interface';
import { ProcessOrdersEntity } from './process-orders.entity';

@Injectable()
export class ProcessOrdersRepository {
  constructor(
    @InjectModel(ProcessOrders.name)
    private readonly ordersModel: Model<ProcessOrdersDocument>,
  ) {}

  async upsertByOrdersRefId(
    ordersRefId: string,
    data: Partial<IProcessOrders>,
    session?: ClientSession,
  ): Promise<ProcessOrdersEntity | null> {
    const result = await this.ordersModel
      .findOneAndUpdate(
        {
          ordersRefId: ordersRefId,
        },
        data,
        {
          new: true,
          upsert: true,
          session: session,
        },
      )
      .exec();

    return ProcessOrdersEntity.fromDB(result);
  }
}
