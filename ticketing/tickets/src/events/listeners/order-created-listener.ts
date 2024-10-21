import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, Subjects } from "@ajauthticket/common";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        
    }

}