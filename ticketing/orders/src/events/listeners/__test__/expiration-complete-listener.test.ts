import mongoose, { set } from "mongoose";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { ExpirationCompleteListner } from "../expiration-complete-listener";
import { Order, OrderStatus } from "../../../models/order";
import { ExpirationCompleteEvent, Listener } from "@ajauthticket/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new ExpirationCompleteListner(natsWrapper.client);
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Created,
        userId: 'aassdsd',
        expiresAt: new Date(),
        ticket
    });
    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    };

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    };

    return {listener, order, ticket, data, msg};
};

it('update the order status cancelled', async () =>{
    const  {listener, order, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);
    expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emit an order cancelled event', async () =>{
    const  {listener, order, ticket, data, msg} = await setup();
    
    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);
    expect(eventData.id).toEqual(order.id);
});

it('ack the message', async () =>{
    const  {listener, order, ticket, data, msg} = await setup();
    
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});