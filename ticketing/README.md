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
            User {
                int id PK
                string email
                string password
            }

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

### Services
1. **auth:** Everything related to user signup/signin/signout
2. **tickets:** Tcket creation/editing. Knows whether a ticket can be updated
3. **orders:** Order creation/editing
4. **expiration:** Watches for orders to be created, cancels them after 15 minutes
5. **payments:** Handles credit card payments. Cancels orders if payments failes. Completes if payments suceeds


