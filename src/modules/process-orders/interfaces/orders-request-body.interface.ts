import { ORDERS_STATUS } from '../../../commons/constants';

export class IOrdersRequestBody {
  _id: string;
  customerId: string;
  totalPrice: number;
  shippingAddress: string;
  billingAddress: string;
  status: ORDERS_STATUS;
  createdAt: Date;
  updatedAt: Date;
}
