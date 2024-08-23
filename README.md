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

- **blog**
    - Project for create & show, post & comments
    - We create different service for handling posts and comments


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

#

## Docker

Docker makes it really easy to install and run software without worrying about setup or dependencies

#### Docker Image creation process

``` mermaid
    flowchart TB;
        step1["Docker File"]
        step1 ~~~|"Configuration to define how our container should behave"|step1
        step2["Docker Client"]
        step1-->step2
        step3["Docker Server"]
        step3 ~~~|"Take all the configuration and make a usable image"|step3
        step2-->step3
        step4["Usable Image"]
        step3-->step4
```

#### How create a Docker file

- A docker file will be the file with name *Dockerfile*, without any file extensions.
- Please refer dockerSample folder for getting more idea.
- Dockerfile each instructions have two parts
    - Instruction telling Docker Server what to do
    - Argument to the instruction
- Why did we use alpine as a base image?
    - They comes with a preinstalled set of programs that are useful.

``` mermaid
    flowchart TB;
        step1["Specify a base image"]
        step2["Run some commands to install additional programs"]
        step1-->step2
        step3["Specify a command to run on container startup"]
        step2-->step3
```

- **What is Docket?**
    - Docker is a pltform or ecosystem around creating and running containers.
        - **Image**: Single file with all the dependencies and configurations required to run a program.
        - **Container**: Instance of an image. Runs a program.
        - **Docker Client**: Tools that we are going to issue commands
        - **Docker Server**: Tools that responsible for creating images, running, containers, etc
    - Docker creates series of things call containers. A container is an isolated computing environment.
    - In micro services each services run in each container. If we need to create a copy of service, we will create a new container of that service.
    - Docker solve the following problems
        - Dependencies needed for the project or services to run
        - How to start and run the app
    - When installaing Docker, there will be a virtual Linux machine along with that.

- **Docker Commands**
    - Run an image: `docker run <image name>`
    - Override default command: `docker run <image name> <echo <message> | ls>`
    - List all running containers: `docker ps`
    - List all containers ever created: `docker ps --all`
    - Create a container: `docker create`
    - Start a container: `docker start`
    - `docker run` = `docker create` + `docker start`
    - Remove containers: `docker system prune`
    - Retreiving all logs: `docker logs <container id>`
    - Stop a container: `docker stop <container id>`
    - Kill a container: `docker kill <container id>`
    - Executing commands in running containers: `docker exec -t <container id> <command>`

- **What is Kubernetes?**
    - Kubernetes a tool for running a bunch of different containers.
    - We give it some configuration to describe how we want our containers to run and interact with each other.

``` mermaid
    flowchart TB
        subgraph Kubernetes Cluster
        direction TB
            subgraph Virtual Machines
            direction LR
                subgraph Node env1
                    subgraph container1
                    stepa["Post Service"]
                    end
                end
                subgraph Node env 2
                    subgraph container2
                    stepb["comment Service"]
                    end
                end
            end
            
            subgraph Program to manage every thing in the cluster
            step4["master"]
            end
        end
```

## Git Guidelines

- Base branch is *main*
- To create new branch: `git checkout -b <branch name>`
- To stage the chnages: `git add .`
- To commit changes: `git commit -am <commit message>`
- To push the changes to remote: `git push`
    - If new branch is not in remote: `git branch --set-upstream-to=<remote>/<branch>`
- To change branch: `git checkout <branch name>`
- To create tag: `git tag -a <tag_name> -m "<Tag message>"`
- To push all tags: `git push origin --tags`
- To list all tags: `git tag`

