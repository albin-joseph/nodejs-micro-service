import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCreatedEvent, OrderStatus } from "@ajauthticket/common";
import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { Ticket } from "../../../models/ticket";

const  setup = async () => {
    //create instance of listener
    const listener = new OrderCreatedListener(natsWrapper.client);

    //Create and save a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'asdf'
    });
    ticket.save();

    //create a fake data event
    const data:OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created;
    userId: 'asdf',
    expiresAt: 'asss',
    ticket: {
        id: ticket.id,
        price: ticket.price
        }
    }

    //@ts-ignore
    const msg:Message = {
        ack: jest.fn()
    }

    return {listener, ticket, msg, data};
}