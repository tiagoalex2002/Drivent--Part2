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
    return res.sendStatus(500);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.userId);

  try {
    const ticket = await ticketServices.getUserTickets(id);
    if (ticket === 404) {
      return res.sendStatus(404);
    } else {
      return res.status(200).send(ticket);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticket = req.body as TypeId;
  const userId = Number(req.userId);

  try {
    const result = await ticketServices.createTicket(ticket.ticketTypeId, userId);
    if (result === 400) {
      return res.sendStatus(400);
    } else if (result === 404) {
      return res.sendStatus(404);
    } else {
      return res.sendStatus(201);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
}
