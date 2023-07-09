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
    throw notFoundError();
  } else {
    const tickets = await ticketRepository.getUserTickets(enrollment);
    if (!tickets) {
      throw notFoundError();
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

export async function createTicket(ticket: TicketDatabase) {
  if (!ticket.ticketTypeId) {
    return 400;
  } else {
    return await ticketRepository.createTicket(ticket);
  }
}

const ticketServices = {
  getTypes,
  getUserTickets,
  updateTicket,
  createTicket,
};

export default ticketServices;
