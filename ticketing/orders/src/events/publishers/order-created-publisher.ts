import { Publisher, OrderCreatedEvent, Subjects } from "@ajauthticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}