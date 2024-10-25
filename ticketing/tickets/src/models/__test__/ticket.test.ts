import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async () => {
    //Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    })

    //save the ticket to the database
    await ticket.save();

    //fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    //make two separate chnages to the ticket we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({print: 15})

    //Save the first fetched ticket
    await firstInstance!.save();

    //save the second fetched ticket and expect an error
    try {
        await secondInstance!.save();
      } catch (err) {
        return;
      }
      
      throw new Error('Should not reach this point');
});

it('increment the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20,
        userId: '123'
    });

    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});