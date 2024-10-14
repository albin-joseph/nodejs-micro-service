import {Publisher, Subjects, TicketUpdatedEvent} from '@ajauthticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    
}