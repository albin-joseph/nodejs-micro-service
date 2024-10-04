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
        graph TD
            subgraph NATS Streaming
                subgraph List of Channels
                end
            end
```

- **Publisher**: Publish the subject:data to NATS streaming channel
- **Listerner**: Any service subscribe the chaannel listern the channel get the subject:data