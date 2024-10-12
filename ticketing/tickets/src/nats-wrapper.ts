import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string) {
        this._client = nats.connect(clusterId, clientId, {url});

        this._client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });

        process.on('SIGINT', () => this.client.close());
        process.on('SIGTERM', () => this.client.close());

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });

            this.client.on('error', (err) => {
                reject(err);
            });

        })
    }
}

export const natsWrapper = new NatsWrapper();