import paymentRepository from '@/repositories/payments-repository';
import { CreatePayment } from '@/protocols';
import ticketRepository from '@/repositories/tickets-repository';

export async function payment(inf: CreatePayment, price: number) {
  if (!inf.ticketId || inf.cardData) {
    return 400;
  } else {
    const ticket = await ticketRepository.getTicketById(inf.ticketId);
    if (!ticket) {
      return 404;
    } else {
      const action = await paymentRepository.payment(inf, price);
      await ticketRepository.updateTicket(inf.ticketId);
      return action;
    }
  }
}

export async function getPayment(Id: number) {
  if (!Id) {
    return 400;
  } else {
    const ticket = await ticketRepository.getTicketById(Id);
    if (!ticket) {
      return 404;
    } else {
      const action = await paymentRepository.getPayment(Id);
      return action;
    }
  }
}

const paymentServices = {
  payment,
  getPayment,
};

export default paymentServices;
