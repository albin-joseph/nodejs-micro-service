import {Publisher, Subjects, TicketCreatedEvent} from '@ajauthticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    
}
