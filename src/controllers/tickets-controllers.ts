import { Response, Request } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketServices from '@/services/tickets-services.ts';
import { TicketDatabase, TypeId } from '@/protocols';

export async function getTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const action = await ticketServices.getTypes();
    if (!action[0]) {
      return res.status(200).send([]);
    } else {
      return res.status(200).send(action);
    }
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
  const ticket = req.body as TypeId;
  const userId = Number(req.userId);

  try {
    const result = await ticketServices.createTicket(ticket.ticketTypeId, userId);
    if (result === 400) {
      return res.sendStatus(400);
    } else {
      return res.sendStatus(201);
    }
  } catch (err) {
    console.log(err.message);
  }
}
