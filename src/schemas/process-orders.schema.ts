import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ORDERS_STATUS } from '../commons/constants';

type ProcessOrdersDocument = ProcessOrders & Document;

@Schema({
  timestamps: true,
})
class ProcessOrders {
  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  ordersRefId: string;

  @Prop({
    required: true,
  })
  processStatus: string;

  @Prop()
  createdAt: Date;
}

const ProcessOrdersSchema = SchemaFactory.createForClass(ProcessOrders);

export { ProcessOrdersSchema, ProcessOrdersDocument, ProcessOrders };
