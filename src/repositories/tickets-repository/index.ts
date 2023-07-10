import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';
import { TicketDatabase } from '@/protocols';

export async function getTypes() {
  return await prisma.ticketType.findMany();
}

export async function getTypeById(Id: number) {
  return await prisma.ticketType.findUnique({ where: { id: Id } });
}

export async function getUserTickets(enrollment: number) {
  const ticket = await prisma.ticket.findFirst({ include: { TicketType: true }, where: { enrollmentId: enrollment } });
  return ticket;
}

export async function createTicket(ticketId: number, enrollId: number) {
  const action = await prisma.ticket.create({
    data: { ticketTypeId: ticketId, enrollmentId: enrollId, status: TicketStatus.RESERVED },
  });
  return action;
}

export async function updateTicket(Id: number) {
  const action = await prisma.ticket.update({ where: { id: Id }, data: { status: TicketStatus.PAID } });
  return action;
}

export async function getTicketById(Id: number) {
  const ticket = await prisma.ticket.findUnique({ where: { id: Id } });
  return ticket;
}

const ticketRepository = {
  getTypes,
  getUserTickets,
  createTicket,
  updateTicket,
  getTicketById,
  getTypeById,
};

export default ticketRepository;
