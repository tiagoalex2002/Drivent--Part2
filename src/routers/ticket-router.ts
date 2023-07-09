import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { getTypes, getUserTicket, createTicket } from '@/controllers/tickets-controllers';
import ticketSchema from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter.get('/tickets', getUserTicket);
ticketsRouter.get('/tickets/types', getTypes);
ticketsRouter.post('/tickets', validateBody(ticketSchema), createTicket);

export default ticketsRouter;
