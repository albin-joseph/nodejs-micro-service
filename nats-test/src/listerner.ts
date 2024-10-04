import nats, {Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listerner connect to NATS');

    const subscription = stan.subscribe('ticket:created', 'orders-service-queue-group');

    subscription.on('message', (msg: Message) =>{
        const data = msg.getData();
        if(typeof data === 'string') {
            console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`)
        }
    })
})