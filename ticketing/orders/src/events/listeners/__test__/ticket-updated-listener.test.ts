import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@ajauthticket/common";
import { Message } from "node-nats-streaming";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
    //Create a listner
    const listner = new TicketUpdatedListener(natsWrapper.client);

    //Create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });
    await ticket.save();

    //Create a fake data object
    const data: TicketUpdatedEvent['data'] = {
        id: ticket.id,
        version: ticket.version + 1,
        title: 'new concert',
        price: 100,
        userId: 'asdffg'
    }

    //Create a message object
    //@ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return {msg, data, ticket, listner};
};

it('finds, updates and saves a ticket', async () => {

});

it('acks the message', async () => {

});