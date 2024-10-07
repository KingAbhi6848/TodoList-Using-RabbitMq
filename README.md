# Todo App with RabbitMQ Notification System

This is a simple Todo application built using Node.js, Express, MongoDB, and RabbitMQ for messaging and notification handling. The app allows users to sign up, sign in, create tasks, and receive notifications for their tasks via email using RabbitMQ and Nodemailer.

## Features

- User authentication (sign up, log in, log out)
- Create, delete, and list tasks (to-dos) for authenticated users
- RabbitMQ integration for sending email notifications on task creation
- Email notifications using Nodemailer
- Prometheus and Grafana integration for monitoring (optional)
- Persistent sessions using MongoDB

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose for object modeling)
- RabbitMQ (for messaging)
- Nodemailer (for sending emails)
- Express-Session (for session management)
- Connect-Mongo (for session storage in MongoDB)
- Express Validator (for input validation)
- Prometheus & Grafana (for monitoring, optional)

## Prerequisites

Ensure that you have the following installed:

- Node.js
- MongoDB
- RabbitMQ
- Prometheus & Grafana (optional for monitoring)
- A `.env` file configured with the following variables:
  ```bash
  MONGODB_URI=<Your MongoDB Connection String>
  AMQP_URI=<Your RabbitMQ Connection String>
  PASS=<Your Email Password>
  
## Clone the repository:
git clone https://github.com/KingAbhi6848/TodoList-Using-RabbitMq.git
cd TodoList-Using-RabbitMq

## Install dependencies:
npm install

** Create a .env file in the root directory and configure your environment variables as shown above.

** Make sure MongoDB and RabbitMQ are running locally or configured in your cloud services.

1. Start the application:
   npm start

2. Access the web interface: Open a browser and navigate to http://localhost:9000.

3. Sign up and log in: Create an account by signing up, then log in to access the todo list.

4. Create and manage tasks: After logging in, you can add, delete, and view tasks.

5. Receive email notifications: Upon task creation, RabbitMQ sends task details via email using Nodemailer.



API Routes

User Routes
GET /user/signup: Render the signup page.
GET /user/signin: Render the signin page.
POST /user/create: Create a new user account.
POST /user/login: Log in an existing user.
POST /user/logout: Log out the user.

Todo Routes
GET /: Get all todos for the logged-in user.  (requires authentication).
POST /add: Add a new todo (requires authentication).
POST /delete/:id: Delete a specific todo (requires authentication)
