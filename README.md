# cis-566-project-group-4

CIS-566 Project for Group 4 members
## Context
CloudBite is a full-stack application designed to streamline operations in cloud kitchens by managing orders, displaying kitchen data, and manaing menu through a single platform. The frontend is developed using React, while the backend leverages Spring Boot.

## System Requirements
Git
Node.js
Java JDK 11 or newer
Gradle
MongoDB
RabbitMQ

## Github
https://github.com/onetrueheisenberg/cis-566-project-group-4/

## Clone the repository:
git clone https://github.com/onetrueheisenberg/cis-566-project-group-4/tree/main
cd cis-566-project-group-4/

## For Windows:
### Setting up the Backend (Spring Boot):
#### Configure MongoDB:
Ensure MongoDB is installed and running on your machine. Follow the steps mentioned below:
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
Configure the application.properties file in the Spring Boot project to connect to your MongoDB instance.
#### Set up RabbitMQ:
Ensure RabbitMQ is installed and running by following the steps below: https://www.rabbitmq.com/docs/install-windows
Configure the RabbitMQ settings in the application.properties if different from default settings.
#### Build and Run the Spring Boot Application using Gradle:
Open a command prompt in the project's root directory and navigate to CloudBite folder.
Use Gradle to compile and run the project:
```bash
gradle build
# or
gradle bootRun (or) ./gradlew bootRun --info
```
### Setting up the Frontend (React):
Navigate to the frontend directory:
```
cd ui/ from “Repository Home folder”
npm install
```

#### Run the React application:
```bash
npm start
# or
npm run dev
# or
npm run build && npm start
# or
next start
```
This will launch the frontend at http://localhost:3000.

### Usage Instructions:
Access the user interface through your web browser at http://localhost:3000 to manage orders(http://localhost:3000/orders/), view the kitchen display (http://localhost:3000/orders/), or update the menu ( (http://localhost:3000/admin/).
Utilize the API endpoints provided by the backend for direct interactions or integration with other systems.

## For Mac:
### Setting up the Backend (Spring Boot):
#### Configure MongoDB:
Ensure MongoDB is installed and running on your machine. Follow the steps mentioned below:
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
Configure the application.properties file in the Spring Boot project to connect to your MongoDB instance.
#### Set up RabbitMQ:
Ensure RabbitMQ is installed and running by following the steps below: https://www.rabbitmq.com/docs/install-homebrew
Configure the RabbitMQ settings in the application.properties if different from default settings.
#### Build and Run the Spring Boot Application using Gradle:
Open a command prompt in the project's root directory and navigate to CloudBite folder.
Use Gradle to compile and run the project:
```bash
gradle build
# or
gradle bootRun (or) ./gradlew bootRun --info
```
### Setting up the Frontend (React):
Navigate to the frontend directory:
```
cd ui/ from “Repository Home folder”
npm install
```
#### Run the React application:
```bash
npm start
# or
npm run dev
# or
npm run build && npm start
# or
next start
```
This will launch the frontend at http://localhost:3000.
### Usage Instructions:
Access the user interface through your web browser at http://localhost:3000 to manage orders(http://localhost:3000/orders/), view the kitchen display (http://localhost:3000/orders/), or update the menu ( (http://localhost:3000/admin/).
Utilize the API endpoints provided by the backend for direct interactions or integration with other systems.
