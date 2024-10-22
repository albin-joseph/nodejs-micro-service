import mongoose, { set } from "mongoose";
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
   await ticket.save();

    //create a fake data event
    const data:OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
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

it('sets the userId of the ticket', async () => {
    const {listener, ticket, data, msg} = await setup();

    await listener.onMessage(data, msg);

    const updateTicket = await Ticket.findById(ticket.id);

    expect(updateTicket!.orderId).toEqual(data.id);

});

it('acks the message', async () =>{
    const {listener, ticket, data, msg} = await setup();
    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () =>{
    const {listener,ticket ,data, msg} = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse(
      (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
    );
  
     expect(data.id).toEqual(ticketUpdatedData.orderId);

});