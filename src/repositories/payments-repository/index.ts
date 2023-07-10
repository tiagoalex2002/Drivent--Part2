import { prisma } from '@/config';
import { CreatePayment } from '@/protocols';

export async function payment(inf: CreatePayment, price: number) {
  const stringDigits = inf.cardData.number.toString();
  const lastDigits = stringDigits.slice(-4);
  const action = await prisma.payment.create({
    data: {
      ticketId: inf.ticketId,
      cardIssuer: inf.cardData.issuer,
      cardLastDigits: lastDigits,
      value: price,
    },
  });
  return action;
}

export async function getPayment(Id: number) {
  const action = await prisma.payment.findFirst({ where: { ticketId: Id } });
  return action;
}

const paymentRepository = {
  payment,
  getPayment,
};

export default paymentRepository;
