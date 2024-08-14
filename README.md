# NodeJS Micro Servive
This repository contains information related to microservices and how to implement them in Node.js. It is created for learning purposes. The information has been gathered from various sources, including the internet, online learning platforms, YouTube, and more.

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

