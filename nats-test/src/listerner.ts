import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

    new TicketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private  client: Stan;
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
      this.client = client;
  }

  subscriptionOptions() {
    return this.client
    .subscriptionOptions()
    .setDeliverAllAvailable()
    .setManualAckMode(true)
    .setAckWait(this.ackWait)
    .setDurableName(this.queGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(
        `Message received ${this.subject}/${this.queGroupName}`
      );

      const parsedData = this.parseMessage(msg)
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf-8'));
  }
}

class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queGroupName = 'payments-service';

  onMessage(data: any, msg: Message): void {
    console.log('Event data:', data);

    msg.ack();
  }
  
}
