import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import _ from 'lodash';
import { IOrdersRequestBody } from './interfaces/orders-request-body.interface';
import { IProcessOrders } from './interfaces/process-orders.interface';
import { ProcessOrdersService } from './process-orders.service';

@Controller('process-orders')
export class ProcessOrdersController {
  private readonly logger: Logger;
  constructor(private readonly ordersService: ProcessOrdersService) {
    this.logger = new Logger(ProcessOrdersController.name);
  }

  @Post('/validate')
  async upsert(
    @Body() body: IOrdersRequestBody,
  ): Promise<Partial<IProcessOrders>> {
    this.logger.log(`Begin: create`, body);
    if (!body._id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation error: missing data',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.ordersService.upsertByOrdersRefId(body._id, {
      ordersRefId: body._id,
      createdAt: body.createdAt,
    });

    this.logger.log(`End: create`);

    return result.toDto();
  }
}
