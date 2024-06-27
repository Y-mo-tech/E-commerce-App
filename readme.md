Microservices Project: Order Management System
 
This project implements an order management system using Node.js microservices and MongoDB, running inside Docker containers and also handles the concurrency control access using optimistic Locking.
It consists of three microservices:
 
Order Service: Manages orders.
Product Service: Manages products and their quantities.
User Service: Manages user information.
A gateway service is used to route requests to the appropriate microservice.
 
Architecture
 
The system architecture is as follows:
 
Gateway Service:
 
Routes incoming requests to the appropriate microservice based on the endpoint.
Microservices:
 
Each microservice communicates with a shared MongoDB instance.
Order Service: Runs on port 8003.
Product Service: Runs on port 8001.
User Service: Runs on port 8002.
MongoDB:
 
Containerized MongoDB instance.
Databases:
OrderData
ProductData
UserData
Installation
 
To run the project locally, follow these steps:
 
Clone the repository:
 

git clone https://github.com/Y-mo-tech/E-commerce-App
cd E-commerce-App

Run Docker Compose:
docker-compose up --build

This command will build and start the Docker containers for MongoDB and all microservices.