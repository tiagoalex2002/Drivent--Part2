import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { getTypes, getUserTicket, createTicket } from '@/controllers/tickets-controllers';
import ticketSchema from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter.get('/', getUserTicket);
ticketsRouter.get('/types', getTypes);
ticketsRouter.post('/', validateBody(ticketSchema), createTicket);

export { ticketsRouter };
