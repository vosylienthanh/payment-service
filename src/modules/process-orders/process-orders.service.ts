import { Injectable, Logger } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { PROCESS_STATUS } from '../../commons/constants';
import { IProcessOrders } from './interfaces/process-orders.interface';
import { ProcessOrdersEntity } from './process-orders.entity';
import { ProcessOrdersRepository } from './process-orders.repository';

@Injectable()
export class ProcessOrdersService {
  private readonly logger: Logger;

  constructor(
    private readonly processOrdersRepository: ProcessOrdersRepository,
  ) {
    this.logger = new Logger(ProcessOrdersService.name);
  }

  async upsertByOrdersRefId(
    ordersRefId: string,
    data: Partial<IProcessOrders>,
    session?: ClientSession,
  ): Promise<ProcessOrdersEntity | null> {
    try {
      data.createdAt = new Date(data.createdAt);
      data.processStatus = await this.processPayment(data);
      const result = await this.processOrdersRepository.upsertByOrdersRefId(
        ordersRefId,
        data,
        session,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `Error: upsertByOrdersRefId(id: ${ordersRefId}, data: ${data})`,
        error,
      );
      throw error;
    }
  }

  private async processPayment(
    data: Partial<IProcessOrders>,
  ): Promise<PROCESS_STATUS> {
    const time = data?.createdAt?.getTime() || new Date().getTime();
    if (time % 7 === 0) {
      return PROCESS_STATUS.DECLINED;
    }

    return PROCESS_STATUS.CONFIRMED;
  }
}
