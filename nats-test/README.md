## Overview
- Create a new subproject with typescript support
- Install node-nats-streaming library and connect to nats streaming server
- We should have two npm scripts, one to run code to emit events, and one to run code to listen for events
- The program will be ran outside of kubernetes!

### Publisher

``` mermaid
        graph TD
            subgraph Publisher
            data[data] --> stan[stan client]
            subject[subject </br> name of the channel] --> stan
            end
```

### Listener


``` mermaid
        graph TD
            subgraph Listener
            subject[Subject to listern to] --> stan[stan client]
            stan[stan client] --> subscription
            end
```

### NATS Streaming Server

``` mermaid
        graph TB
            subgraph NATS Streaming
                subgraph List of Channels
                    subgraph ticket:created
                    end
                end
                subgraph List of Clients
                    direction TB
                    subgraph abc
                    end
                    subgraph 123
                    end
                end
            end
```

- **Publisher**: Publish the subject:data to NATS streaming channel
- **Listerner**: Any service subscribe the chaannel listern the channel get the subject:data
- **port-forwarding**: kubectl port-forward nats-depl-647c78564d-xtbz6 4222:4222 (To get pod name `kubectl get pods`)

### Concurrency Solutions
- **Share state between services of last event processed**
    - It execute in a sequential way
    - Only one update happens at a time. It's a draw back
- **Last event processed tacked by resource ID**

### Event based updates

```mermaid
    graph LR
        A[Network Request to Create/Update/Delete Resources XYZ] --> B[Service that owns XYZ]
        B --> C[(Database Storing XYZ)]
        C --> B
        B --> D[Event Describing Change to XYZ]
        D --> E[NATS]
        E --Event--> F[Service that needs to update its data based up on the Event]

```

