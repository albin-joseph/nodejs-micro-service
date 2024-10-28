import { Subjects, Listener, PaymentCreatedEvent, OrderStatus } from "@ajauthticket/common";
import { queueGroupName } from "./queue-group-name";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
    queGroupName = queueGroupName

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if(!order) {
            throw new Error('Order not found');
        }

        order.set({
            status: OrderStatus.Complete
        });

        msg.ack();
    }
}