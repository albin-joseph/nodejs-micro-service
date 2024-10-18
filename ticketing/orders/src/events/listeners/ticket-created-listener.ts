import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@ajauthticket/common";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queGroupName = 'order-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
        
    }
}
