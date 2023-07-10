import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { TicketDatabase } from '@/protocols';
import { notFoundError } from '@/errors';

export async function getTypes() {
  return await ticketRepository.getTypes();
}

export async function getUserTickets(enrollment: number) {
  const user = await enrollmentRepository.findWithUserId(enrollment);
  if (!user) {
    return 404;
  } else {
    const tickets = await ticketRepository.getUserTickets(user.id);
    if (!tickets) {
      return 404;
    } else {
      return tickets;
    }
  }
}

export async function updateTicket(Id: number) {
  const ticket = await ticketRepository.updateTicket(Id);
  if (!ticket) {
    throw notFoundError();
  } else {
    return ticket;
  }
}

export async function createTicket(ticketId: number, userId: number) {
  const user = await enrollmentRepository.findWithUserId(userId);
  if (!user) {
    return 404;
  } else {
    if (!ticketId) {
      return 400;
    } else {
      await ticketRepository.createTicket(ticketId, user.id);
      const tickets = await getUserTickets(userId);
      return tickets;
    }
  }
}

export async function getTypeById(Id: number) {
  return await ticketRepository.getTypeById(Id);
}

export async function getTicketById(Id: number) {
  return await ticketRepository.getTicketById(Id);
}

const ticketServices = {
  getTypes,
  getUserTickets,
  updateTicket,
  createTicket,
  getTypeById,
  getTicketById,
};

export default ticketServices;
