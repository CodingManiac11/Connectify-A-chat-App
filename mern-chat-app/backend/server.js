const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const http = require('http');

// Initialize express
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Connect to MongoDB first
console.log("Attempting MongoDB connection...".yellow.bold);
connectDB()
  .then(() => {
    // Only start server after successful DB connection
    startServer();
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB. Server will not start.".red.bold);
    console.error(error);
    process.exit(1);
  });

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Function to start server
function startServer() {
  const PORT = 8000;
  
  try {
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`.green.bold);
      
      // Initialize Socket.IO after server is running
      const io = require("socket.io")(server, {
        pingTimeout: 60000,
        cors: {
          origin: ["http://localhost:3000", "http://localhost:3008", "http://localhost:3009"],
          credentials: true,
        },
      });

      // Socket event handlers
      io.on("connection", (socket) => {
        console.log("New client connected to socket.io".cyan);
        
        socket.on("setup", (userData) => {
          socket.join(userData._id);
          socket.emit("connected");
          console.log(`User ${userData._id} setup complete`);
        });

        socket.on("join chat", (room) => {
          socket.join(room);
          console.log("User joined room:", room);
        });
        
        socket.on("typing", (room) => socket.in(room).emit("typing"));
        socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

        socket.on("new message", (newMessageRecieved) => {
          const chat = newMessageRecieved.chat;
          
          if (!chat.users) {
            console.log("Chat users not defined");
            return;
          }

          chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
          });
        });

        socket.on("disconnect", () => {
          console.log("Client disconnected from socket.io".cyan);
        });
      });
    });
  } catch (error) {
    console.error("Failed to start server:".red.bold, error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:".red.bold, error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:".red.bold, error);
  process.exit(1);
}); 