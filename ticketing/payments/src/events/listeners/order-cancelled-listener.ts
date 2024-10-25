import { Listener, OrderCancelledEvent, OrderStatus, Subjects } from "@ajauthticket/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/order";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queGroupName = queueGroupName;
    async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
       const order = await Order.findOne({
        _id: data.id,
        version: data.version-1
       });

       if(!order) {
        throw new Error('Order not found');
       }

       order.set({ status:OrderStatus.Cancelled});
       order.save();

       msg.ack();
    }
    
}