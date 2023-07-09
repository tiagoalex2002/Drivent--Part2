import Joi from 'joi';
import { CreatePayment } from '@/protocols';

const paymentSchema = Joi.object<CreatePayment>({
  ticketId: Joi.number().positive().required(),
  cardData: Joi.object().required(),
});

export default paymentSchema;
