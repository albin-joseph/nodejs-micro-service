import { OrderCreatedEvent, OrderStatus } from "@ajauthticket/common";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose, { set } from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/order";


const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const data: OrderCreatedEvent['data'] = {
        id: new mongoose.Types.ObjectId().toHexString(),
        version: 0,
        expiresAt: 'asddd',
        userId: 'asdsds',
        status: OrderStatus.Created,
        ticket: {
            id: 'assdsd',
            price: 10
        }
    }

    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {listener, data, msg};
};

it('replicates the order info', async () => {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const order = await Order.findById(data.id);

    expect(order!.price).toEqual(data.ticket.price);
});

it('ack the message', async () => {
    const {listener, data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});