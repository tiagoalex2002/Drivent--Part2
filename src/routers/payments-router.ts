import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import paymentSchema from '@/schemas/payment-schema';
import { payment, getPayment } from '@/controllers/payments-controllers';

const paymentRouter = Router();

paymentRouter.get('/', authenticateToken, getPayment);
paymentRouter.post('/process', authenticateToken, validateBody(paymentSchema), payment);

export { paymentRouter };
