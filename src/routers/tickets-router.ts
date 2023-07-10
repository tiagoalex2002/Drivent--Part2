import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { getTypes, getUserTicket, createTicket } from '@/controllers/tickets-controllers';
import ticketSchema from '@/schemas/ticket-schema';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.get('/', authenticateToken, getUserTicket);
ticketsRouter.get('/types', authenticateToken, getTypes);
ticketsRouter.post('/', authenticateToken, validateBody(ticketSchema), createTicket);

export { ticketsRouter };
