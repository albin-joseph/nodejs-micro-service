import { Publisher, OrderCancelledEvent, Subjects } from "@ajauthticket/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}