# Connectify
Connectify is a Full Stack Chatting App that uses Socket.io for real-time communication and stores user details in an encrypted format in a MongoDB Database.

## Author
Aditya Utsav

Last Updated: April 11, 2024

## Tech Stack
Client: React JS

Server: Node.js, Express.js

Database: MongoDB

Features
Authentication

Real-time Chatting

Real-time Notifications

Typing Indicators

One-to-One Chat

Group Chat

User Profile

Search Users

Email & Password Authentication

Custom Error Handling

Installation Guide
Prerequisites
Node.js (v14+ recommended)

MongoDB

npm

Steps to Run Locally
Clone the project


git clone https://github.com/CodingManiac11/Chat-app.git
Go to the project directory


cd chat-app
Install dependencies for the backend


cd backend
npm install
Install dependencies for the frontend


cd frontend
npm install
Create a .env file in the backend directory with the following content:


PORT=8000
MONGO_URI=mongodb://127.0.0.1:27017/chat-app
JWT_SECRET=your_jwt_secret
Start the backend server


cd backend
node server.js
Start the frontend (in a new terminal)

cd frontend
npm start
Open your browser and go to:

arduino
Copy
Edit
http://localhost:3000
Usage Guide
Sign Up
Click on the "Sign Up" tab

Fill in your details

Upload a profile picture (optional)

Click the "Sign Up" button

Login
Enter your email and password

Click the "Login" button

Chat Features
Search users to chat with

Click on a user to start chatting

Create group chats

Update group info (admin only)

Real-time message notifications

See typing indicators

Environment Variables
To run this project, you will need to add the following environment variables to your backend .env file:

PORT - Backend server port (default: 8000)

MONGO_URI - MongoDB connection string

JWT_SECRET - Secret key for JWT authentication

API Endpoints
User Routes
POST /api/user/ - Sign up

POST /api/user/login - Login

GET /api/user/ - Get all users

GET /api/user/:id - Get user by ID

Chat Routes
POST /api/chat/ - Create/access one-to-one chat

POST /api/chat/group - Create group chat

PUT /api/chat/rename - Rename group

PUT /api/chat/groupadd - Add user to group

PUT /api/chat/groupremove - Remove user from group

Message Routes
POST /api/message - Send message

GET /api/message/:chatId - Get all messages for a chat

Error Handling
The app includes custom error handling for:

Invalid routes

Server errors

Authentication errors

Database errors

Contributing
Contributions are always welcome! Please create a PR to contribute.
