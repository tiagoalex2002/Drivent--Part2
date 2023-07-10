import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { getTypes, getUserTicket, createTicket } from '@/controllers/tickets-controllers';
import { authenticateToken } from '@/middlewares';
import ticketSchema from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter.get('/', getUserTicket);
ticketsRouter.get('/types', getTypes);
ticketsRouter.post('/', authenticateToken, validateBody(ticketSchema), createTicket);

export { ticketsRouter };
