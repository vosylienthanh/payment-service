import { result, sumBy } from 'lodash';
import { CommonHelper } from '../../commons/common.helper';
import { ORDERS_STATUS } from '../../commons/constants';
import { ProcessOrdersDocument } from '../../schemas';
import { IProcessOrders } from './interfaces/process-orders.interface';

export class ProcessOrdersEntity {
  private _id: string;
  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }
  private _ordersRefId: string;
  public get ordersRefId(): string {
    return this._ordersRefId;
  }
  public set ordersRefId(value: string) {
    this._ordersRefId = value;
  }
  private _processStatus: string;
  public get processStatus(): string {
    return this._processStatus;
  }
  public set processStatus(value: string) {
    this._processStatus = value;
  }

  private _createdAt?: Date;
  public get createdAt(): Date {
    return this._createdAt;
  }
  public set createdAt(value: Date) {
    this._createdAt = value;
  }

  static fromDB(data?: ProcessOrdersDocument): ProcessOrdersEntity | null {
    if (!data) {
      return null;
    }

    const record = new ProcessOrdersEntity();
    record.id = data._id;
    record.ordersRefId = data.ordersRefId;
    record.processStatus = data.processStatus;
    record.createdAt = data.createdAt;

    return record;
  }

  toDto(): Partial<IProcessOrders> {
    const dto: IProcessOrders = {
      _id: this.id,
      ordersRefId: this.ordersRefId,
      processStatus: this.processStatus,
      createdAt: this.createdAt,
    };

    return CommonHelper.clearNilProperties(dto);
  }
}
