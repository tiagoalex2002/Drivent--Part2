import Joi from 'joi';
import { TypeId } from '@/protocols';

const ticketSchema = Joi.object<TypeId>({
  ticketTypeId: Joi.number().required(),
});

export default ticketSchema;
