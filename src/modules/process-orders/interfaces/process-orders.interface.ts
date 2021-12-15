import { ORDERS_STATUS } from '../../../commons/constants';

export interface IProcessOrders {
  _id: string;
  ordersRefId: string;
  processStatus: string;
  createdAt: Date;
}
