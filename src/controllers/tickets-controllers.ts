import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketServices from '@/services/tickets-services.ts';
import { TicketDatabase } from '@/protocols';

export async function getTypes(req: Request, res: Response) {
  try {
    const action = await ticketServices.getTypes();
    return res.status(httpStatus.OK).send(action);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.userId);

  try {
    const ticket = await ticketServices.getUserTickets(id);
    return res.status(200).send(ticket);
  } catch (err) {
    console.log(err.message);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticket = req.body as TicketDatabase;

  try {
    const result = await ticketServices.createTicket(ticket);
    if (result === 400) {
      return res.sendStatus(400);
    } else {
      return res.sendStatus(201);
    }
  } catch (err) {
    console.log(err.message);
  }
}
