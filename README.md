# NodeJS Micro Service
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


**Docker is a platform that simplifies the process of building, testing, and deploying applications by using containerization. Containerization allows developers to package an application and its dependencies into a standardized unit called a container, ensuring that the application runs consistently across different environments.**

- **Docker**
        - Docker is a set of platform-as-a-service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. It provides tools and services to create, deploy, and manage containers.

- **Docker Image**
    - A Docker image is a lightweight, standalone, and executable package that includes everything needed to run a piece of software, including the code, runtime, libraries, environment variables, and configuration files. Docker images are built using a Dockerfile, which contains instructions for assembling the image. Once built, an image can be shared and reused.


- **Docker Container**
    - A Docker container is a runtime instance of a Docker image. It is a lightweight, isolated environment where the application runs. Containers are designed to be portable and consistent across different environments, such as development, testing, and production.

    - Immutable: Once an image is created, it doesn’t change. Any updates require creating a new image.

    - Layers: Images are made up of layers, with each layer representing a step in the Dockerfile. Layers are cached, which speeds up the build process.

    - Isolated: Containers run in their isolated user space, allowing multiple containers to run on the same host without interfering with each other.

    - Ephemeral: Containers can be stopped, started, deleted, and recreated easily, making them highly flexible and suitable for dynamic scaling.
     

- **How They Work Together:**
        - Docker Image is like a blueprint for your application.
        - Docker Container is a running instance of that image.

    - **In summary:**
        - Docker is the tool/platform.
        - Docker Image is the template.
        - Docker Container is the instance created from the template.

- **Docker Commands**
    - Build docker image: `docker build .`
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
    - Tagging an Image: `docker build -t <docker id>/<repo or project name> : <version>`
    - docker port mapping: `docker run -p <route incomming port>:<port route inside the container> <image name>`

## Kubernetes
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

- **Kubernetes Cluster** : A coolections of nodes and a master to manage them.
- **Node** : A virtual machine that will run our containers.
- **Pod** : More or less a running container. Technically a pod can run multiple containers.
- **Deployment** : Monitors a set of pods, make sure they are running and restart them if they crash.
- **Service** : Provide an easy to remember URL to access a running container.

- **Kubernetes Config Files**
    - Tells Kubernetes about different Deployments, Pods and Services (referred to as *Objects*)that we want to create.
    - Config file should be a YAML file
    - Always store these files with our project source code.
    - We can create Objects without config files [Do not do this]. Config files provide a precise definition of what your cluster is running.
    - k8s is the shortform to represent kubernetes. Where we are putting all the kubernetes config files
    - To create Pod, please run the command on the location where the config file written `kubectl apply -f <config_file_name>.yaml`
    - To list the pods `kubectl get pods`

### Kubernetes - Understand Pod Specs

``` mermaid
    flowchart TD;
        step1["apiVersion: v1"]
        step1 ~~~|"k8s is extensible-we can add our own custom objects. This specify set of objects we want k8s to llok at"|step1
        step2["kind:Pod"]
        step2 ~~~|"The type of object we want to create"|step2
        step1-->step2
        step3["metadata"]
        step3 ~~~|"Config option for the object we are about to create"|step3
        step2-->step3
        step4["name:posts"]
        step4 ~~~|"When pod create give a name 'posts'"|step4
        step3-->step4
        step5["spec"]
        step5 ~~~|"The exact attribute we want to apply to object we are about to create"|step5
        step4-->step5
        step6["containers"]
        step6 ~~~|"We can create many containers in a single pod"|step6
        step5-->step6
        step7["name:posts"]
        step7 ~~~|"Make a container with a name 'posts'"|step7
        step6-->step7
        step8["image:blog/posts:0.0.1"]
        step8 ~~~|"The exact image we want to use"|step8
        step7-->step8
```

### Kubernetes Commands
- `kubectl get pods` : Print out information about all of the running pods
- `kubectl exec -it <pod name> <cmd>` : Execute the given command in a running pod
- `kubectl logs <pod name>` : Print out logs from the given pod
- `kubectl delete pod <pod name>` : Delete the given pod
- `kubectl apply -f <config file name>` : Tells kubernetes to process the config
- `kubectl describe pod <pod name>` : Print out some information about the running pod

### Deployment in Kubernetes

In Kubernetes, a Deployment is a resource object that provides declarative updates to applications. It is used to manage the creation, scaling, and updating of a group of pods. A Deployment defines the desired state of your application (e.g., the number of replicas, the container image version, etc.) and ensures that the current state matches this desired state.

- **Key Features of a Deployment:**
    - **Declarative Updates:** You describe the desired state of the application, and Kubernetes ensures that the current state matches it. If the deployment configuration is updated, Kubernetes gradually updates the running application.

    - **Scaling:** A Deployment can automatically scale the number of pod replicas up or down based on load or manually specified configuration.

    - **Self-Healing:** Kubernetes ensures that the specified number of pod replicas are always running. If a pod crashes or a node fails, Kubernetes will automatically replace the failed pods to maintain the desired number.

    - **Rolling Updates:** Deployments support rolling updates, which allow you to update the application without downtime by gradually replacing old pods with new ones. If something goes wrong during the update, Kubernetes can roll back to the previous stable version.

    - **Rollback:** If a deployment fails (e.g., due to a bad image or configuration), Kubernetes can automatically or manually revert to the previous version of the deployment.

- **Key Sections:**
    - **metadata:** Contains the name and labels of the Deployment.
    - **spec:**
        - **replicas:** Specifies the number of pod replicas that should be running.
        - **selector:** Defines how to identify which pods belong to this deployment.
        - **template:** Provides the pod template, specifying the containers, images, and other settings for the pods managed by this Deployment.

- **Use Cases:**
    - Deploying stateless applications like web servers.
    - Managing microservices with multiple versions.
    - Handling batch processing jobs.
    - Rolling out updates and patches to applications with minimal downtime.

- **Deployement commands:**
    - `kubectl get deployments` : List all the running deployments
    - `kubctl describe deployment <deplyment name>`: Print out details about a deplyment
    - `kubectl apply -f <deployment config file name>` : Create deployment out of config file
    - `kubectl delete deployment <deployment name>` : Delete a deployment

- **Types of Services in Kubernetes:**
    - **ClusterIP (default):**
        - Exposes the service on a cluster-internal IP.
        - Only accessible within the cluster.
        - This is typically used for internal communication between different services in the same cluster.
    - **NodePort:**
        - Exposes the service on each node's IP at a static port.
        - Makes the service accessible externally by requesting <NodeIP>:<NodePort>.
        - This is useful for development and testing environments.
    - **LoadBalancer:**
        - Exposes the service externally using a cloud provider's load balancer.
        - This automatically provisions a load balancer in cloud environments (like AWS, GCP, Azure) and routes external traffic to the service.
    - **ExternalName:**
        - Maps a service to the contents of the externalName field (like a DNS name).
        - This is used to route traffic to services outside the Kubernetes cluster.

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


