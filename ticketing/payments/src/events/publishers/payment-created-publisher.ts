import { Subjects, Publisher, PaymentCreatedEvent } from "@ajauthticket/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}