import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "./ticket-created-event";
import { Subjects } from "./subjects";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queGroupName = 'payments-service';
  
    onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
      console.log('Event data:', data);
  
      msg.ack();
    }
    
  }