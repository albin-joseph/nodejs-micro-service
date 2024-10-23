import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@ajauthticket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";

export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queGroupName = queueGroupName;
    onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        throw new Error("Method not implemented.");
    }

}