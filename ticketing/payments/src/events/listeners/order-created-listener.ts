import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ajauthticket/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
       const order = Order.build({
        id: data.id,
        price: data.ticket.price,
        status: data.status,
        userId: data.userId,
        version: data.version
       });
       await order.save();
       
       msg.ack();
    }
}