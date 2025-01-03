# Overview

In this we focusing creating a micro service project resolve all the pain points we faced in blog projects.

**These are the solutions:**
- Build a centrial library as an NPM module to share code between our different projects.
- precisely define all of our events in this shared library
- Write everything in Typescript
- Write test for much as possible/reasonable
- Run a k8s cluster in the cloud and develop on it almost as quickly as local
- Introduce a lot of code to handle concurrency issues

## Ticketing App

1. Users can list a ticket for an event(concert, sports) for sale.
2. Other users can purchase this ticket.
3. Any user can list ticket for sale and purchase ticket.
4. When a user attempt to purchase a ticket, the ticket is *locked* for 15 minutes. The user has 15 minutes to enter their payment info.
5. While locked, no other user can purchase the ticket. After 15 minutes, the ticket should unlock.
6. Tcket prices can be edited if they are not locked.

### ER Diagram

``` mermaid
        erDiagram
            User ||--|{ Order : "user orders"
            User ||--|{ Ticket : "user tickets"
            User {
                int id PK
                string email
                string password
            }

            Order ||--||Ticket : "ticket"
            Order ||--|| Charge : "order charge"
            Order {
                int id PK
                int user_id FK
                int ticket_id FK
                enum status
                date expires
            }

            Ticket {
                int id PK
                int user_id FK
                int order_id FK
                string title
                number price
            }

             Charge {
                int id PK
                int order_id FK
                enum status
                number amount
                string stripe_id
                string stripe_refund_id
            }

```

### Architecture

``` mermaid
    graph TD
    subgraph Client
        Browser --> NextJS
    end

    subgraph MicroServices
        API[API Gateway] --> Common[Common Middleware Error handler]
        Common --> AuthService[Authentication Service]
        Common --> TicketService[Ticket Service]
        Common --> OrderService[Order Service]
        Common --> PaymentService[Payment Service]
        Common --> ExpirationService[Expiration Service]
        AuthService --> UserDB[(User-mongoDB)]
        TicketService --> TicketDB[(Ticket-mongoDB)]
        OrderService --> OrderDB[(Order-mongoDB)]
        PaymentService --> Payment[(Payment-mongoDB)]
        ExpirationService --> Expiration[(Expiration-Redis)]
        NATS[NATS Streaming Server] --> AuthService
        NATS --> TicketService
        NATS --> OrderService
        NATS --> PaymentService
        NATS --> ExpirationService
    end

    subgraph ExternalServices
        PaymentGateway[Payment Gateway] --> PaymentService
    end

    Client --> API

```

### Services
1. **auth:** Everything related to user signup/signin/signout
2. **tickets:** Tcket creation/editing. Knows whether a ticket can be updated
3. **orders:** Order creation/editing
4. **expiration:** Watches for orders to be created, cancels them after 15 minutes
5. **payments:** Handles credit card payments. Cancels orders if payments failes. Completes if payments suceeds

### Auth Service

 ``` mermaid
    flowchart LR;

        subgraph MongoDB
        step21["Mongo DB instance"]
        end
        
        subgraph Auth service
        step11["express app"]
        step12["mongoose"]
        end

        subgraph React App
        step1["React web app"]
        end

        step1--{email, password}-->step11
        step11-->step12
        step12-->step11

        step12-->step21
        step21-->step12
```

- **Cookies:**
    - Transport mechanism
    - Moves any kind of data between browser and server
    - Automatically managed by the browser
- **JWT's:**
    - Authentication/Authorization mechanism
    - Stores any data we want
    - We have to manage it manually
- **Our Auth Mechanism Requirement:**
    - Must be able to tell us details about a user
    - Must be able to handle authorization info
    - Must have a built-in, tamper-resistant way to expire or invalidate itself
    - Must be easily understood between different languages
    - Must not require some kind of backing data store on the server
    - The above all usecase satisfy when we are using JWT+cookies based authentication/autherization logic

- **Test with microservices**
    - Scope of our tests
        - Test a single piece of code in isolation
        - Test how different piece of code work together
        - Test how differnt component work together
        - Test how different services work together
- **Code sharing and reusing between the services**
    - Options
        - Direct copy paste - [Not a suggested option]
        - Git submodule - [Little bit challenging]
        - NPM package - [Recommended way]
    - **NPM Package**
        - We can publish package to a Pubic and Private Registry
            - Public
                - It avaialble and visble to public
                - Also in public we can publish inside an organization. A person who is the member of the organisation can access. We need to pay extra money
            - Private
                - Private or dedicate person can access. We need to pay money
        - We are going with the public organization.
    - **How to publishing an npm package in public organisation**
        - Create an npm account
        - Create a public organization in our account
        - Then start npm project and setup git
        - After commit the project to git publish the package to npm registary. Before publising please ensure following thing
            - package.json file name parameter updated with *@<npmorgname>/<packagename>*
        - Execute the command in terminal `npm publish --access public`
            - If any authentication error happend please execute the command `npm login` and enter credential or proceed the instruction.
            - After successful login, publish command execute again.
        - Visit our npm account verify organization under new package published.
        - To update the package version/increment the version please execute command `npm version patch`
            - Thi command will open the package.json and update the version to next.
        - Refer:
            - git:-https://github.com/albin-joseph/common
            - npm:-https://www.npmjs.com/package/@ajauthticket/common
            

## Tickets Service

### NATS

```mermaid
    graph TD
        subgraph Defined in common module
        A[Enum Subjects]
        B[Class Listener]
        C[Interface TicketUpdateEvent]
        end

        subgraph Defined in payment service
        AA[Class TicketCreatedListener]
        end

        subgraph Defined in tickets service
        BB[Class OrderUpdateListener]
        end

        B-->AA
        B-->BB
```

### Order Service

```mermaid
    graph TD
        subgraph Order-Service
            
            subgraph Order
                    W[userId]
                    X[status]
                    Y[expiresAt]
                    Z[ticketId]
                end

            subgraph TicketInOrderService
                    P[title]
                    Q[price]
                    R[version]
                end
        end

        subgraph Ticket-Service
            subgraph Ticket
                A[title]
                B[price]
                C[userdId]
                D[version]
            end
        end

        Z --> TicketInOrderService
        Ticket-Service --Event ticket:created--> Order-Service
        Ticket-Service --Event ticket:updated--> Order-Service
```
#### orders
| Route     | Method |      Body        |       Purpose     |
|:----------|:-------|:-----------------|:------------------|
| /api/orders| GET   |   -              | Retrieve all active orders for the given user making the request |
| /api/orders/:id| GET | -              | Get details about a specific order |
| /api/orders| POST  | {ticketId: string} | Create an order to purchase the specific ticket |
| /api/orders/:id | DELETE | -          | Cancel the order |

### QueueGroup
- QueueGroup ensure an event going to a either one of the service
- QueueGroup name avoid typos. We need to define this in a common place and import it and use
- We can resolve the concurrency issue by using event versioning

### Expiration Service
- Expiration service for checking and handling the ticket booking expiration timeout handling

```mermaid
    graph TD
        subgraph order:created
        end
        subgraph Expiration-Service
            A[Remind me to do something 15 minutes from now]
            B[Bull JS]
            A-->B
        end
        order:created --> Expiration-Service
        subgraph expiration:complete
        end
        Expiration-Service --> expiration:complete
        subgraph Redis-Server
            X[List of jobs]
        end
        B-->Redis-Server
```

### Payments Service
- This service for handling the payments for the orders

```mermaid
    flowchart TD
        subgraph order:created
        end
        subgraph order:cancelled
        end
        subgraph payment-service
            A[Charges]
            B[Orders]
        end
        subgraph charge:created
        end
        order:created --> payment-service
        order:cancelled --> payment-service
        payment-service --> charge:created
```


## NB: How to create a service and Configure
    - Create a directory and nvaigate to
    - Create package.json, install deps
    - Write Dockerfile
    - Write .dockerignore file
    - Creare index.ts to run project
    - Build image, push to docker hub 
        - `docker build -t <docker_username>/<image name> .`
        - `docker push <docker_username>/<image name>`
    - Write k8s file for deployment, service
    - Update skaffold.yaml to do file sync for tickets
    - Write k8s file for MongoDB deployment, service