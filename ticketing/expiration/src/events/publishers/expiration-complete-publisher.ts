import { Subjects, Publisher, ExpirationCompleteEvent } from "@ajauthticket/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

}