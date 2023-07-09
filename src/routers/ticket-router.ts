import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { getTypes, getUserTicket, createTicket } from '@/controllers/tickets-controllers';
import { authenticateToken } from '@/middlewares';
import ticketSchema from '@/schemas/ticket-schema';

const ticketsRouter = Router();

ticketsRouter.get('/tickets', getUserTicket);
ticketsRouter.get('/tickets/types', getTypes);
ticketsRouter.post('/tickets', authenticateToken, validateBody(ticketSchema), createTicket);

export default ticketsRouter;
