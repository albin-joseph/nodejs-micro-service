## Overview

This is a simple blog project to demonstarte micro service. In this project there are 3 parts. 2 micro service developed in nodejs and 1 client project developed in react. 

Please see the overall structure of the client app

``` mermaid
    flowchart TD
     subgraph Blog 
        step1["App"]
        step2["Create posts"]
        step1 --> step2
        step3["List all posts"]
        step1 --> step3
        step4["Create comments"]
        step3 --> step4
        step5["List all comments"]
        step3 --> step5
        end
```

### Blog
- *Posts Micro Service*
    - It's an node js express application
    - There are two apis: list all posts and create posts
- *Comments Micro Service*
    - It's an node js express application
    - There are two apis: list all comments and create comments
    - Comments create under particular *post id*, this dependency we needs to send along with each apis