import paymentRepository from '@/repositories/payments-repository';
import { CreatePayment } from '@/protocols';
import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';

export async function payment(inf: CreatePayment, price: number, userId: number) {
  if (!inf.ticketId || inf.cardData) {
    return 400;
  } else {
    const ticket = await ticketRepository.getTicketById(inf.ticketId);
    if (!ticket) {
      return 404;
    } else {
      const user = await enrollmentRepository.findWithUserId(userId);
      const ticket = await ticketRepository.getTicketById(inf.ticketId);
      if (!ticket) {
        return 404;
      } else {
        if (user.id !== ticket.enrollmentId) {
          return 401;
        } else {
          const action = await paymentRepository.payment(inf, price);
          await ticketRepository.updateTicket(inf.ticketId);
          return action;
        }
      }
    }
  }
}

export async function getPayment(Id: number, userId: number) {
  if (!Id) {
    return 400;
  } else {
    const user = await enrollmentRepository.findWithUserId(userId);
    const ticket = await ticketRepository.getTicketById(Id);
    if (!ticket) {
      return 404;
    } else {
      if (user.id !== ticket.enrollmentId) {
        return 401;
      } else {
        const action = await paymentRepository.getPayment(Id);
        return action;
      }
    }
  }
}

const paymentServices = {
  payment,
  getPayment,
};

export default paymentServices;
