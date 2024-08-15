# NodeJS Micro Servive
This repository contains information related to microservices and how to implement them in Node.js. It is created for learning purposes. The information has been gathered from various sources, including the internet, online learning platforms, YouTube, and more.

### What is micro service and monolith service

1. In monolith every feature implemented under same 
    - Entire application sharing the component
    - If any service or any component failed entire application will crashes

 ``` mermaid
    flowchart LR;
        subgraph Monolith Server
        step1["Routing"]
        step2["Middlewares"]
        step3["Business Logics"]
        step4["Database Access"]
        end

```
2. One micro service is developing for a single feature
    - Every feature/service hosted as separted micro services.
    - If any service or feature failed, it will not affect the other service or faeture.

``` mermaid
    flowchart LR;
        subgraph service 1
        step1["Routing"]
        step2["Middlewares"]
        step3["Business Logics"]
        step4["Database Access"]
        end

        subgraph service 2
        step5["Routing"]
        step6["Middlewares"]
        step7["Business Logics"]
        step8["Database Access"]
        end

```

### Challenges in micro services
- Data management between the services
    - Every service needs there own database
        - We want each service to run independently of other service
        - Database schema/structure might change unexpectedly
        - Some services might function more efficiently with different type of DB's(sql vs nosql)
    - Services will never, ever reach in to another services database
        - We can resolve by using communication startergies between the services
        - Sync: *Services communicate with each other using direct requests*
            - Conceptually easy to understand
            - Requesting service doen't need database
            - Introduces a dependency between the services
            - If any inter service request failes, the overall request fails
            - The entire request only fast as the slowest request
            - Can easily introduce the webs of requests
        - Async: *Services communicate with each other using events*
            - Service have zero dependencies on other services
            - Service is extremely fast
            - Data duplication. Paying for extra storage and extra DB
            - Harder to understand

## Projects

- **01Project**
    - Project for create & show post & comments
    - We create different service for handling posts adn comments


``` mermaid
    flowchart LR
        subgraph Micro Services
        direction LR
            subgraph POSTS
            direction LR
            step1["Posts"]
            step2["Create a post"]
            step3["List all posts"]
            step1 --> step2
            step1 --> step3
            end

            subgraph COMMENTS
            direction LR
            step4["Comments"]
            step5["Create a comment"]
            step6["List all comments"]
            step4 --> step5
            step4 --> step6
            end
        end
```

    
