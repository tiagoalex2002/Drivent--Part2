import { Router } from 'express';
import { validateBody } from '@/middlewares';
import paymentSchema from '@/schemas/payment-schema';
import { payment, getPayment } from '@/controllers/payments-controllers';

const paymentRouter = Router();

paymentRouter.get('/', getPayment);
paymentRouter.post('/process', validateBody(paymentSchema), payment);

export { paymentRouter };
