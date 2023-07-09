import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';
import { TicketDatabase } from '@/protocols';

export async function getTypes() {
  return await prisma.ticketType.findMany();
}

export async function getUserTickets(enrollment: number) {
  const ticket = await prisma.ticket.findFirst({ where: { enrollmentId: enrollment } });
  return ticket;
}

export async function createTicket(ticket: TicketDatabase) {
  const action = await prisma.ticket.create({
    data: { ticketTypeId: ticket.ticketTypeId, enrollmentId: ticket.enrollmentId, status: TicketStatus.RESERVED },
  });
  return action;
}

export async function updateTicket(Id: number) {
  const action = await prisma.ticket.update({ where: { id: Id }, data: { status: TicketStatus.PAID } });
  return action;
}

const ticketRepository = {
  getTypes,
  getUserTickets,
  createTicket,
  updateTicket,
};

export default ticketRepository;
