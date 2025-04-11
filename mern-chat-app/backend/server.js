const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
<<<<<<< HEAD
=======
const http = require('http');
>>>>>>> 652ec256d84570cee906d4d35137ee8de1053b07

// Initialize express
const app = express();

<<<<<<< HEAD
// Connect to MongoDB first
console.log("Connecting to local MongoDB...");
connectDB();

app.use(express.json()); // to accept json data

// Routes
=======
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
>>>>>>> 652ec256d84570cee906d4d35137ee8de1053b07
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

<<<<<<< HEAD
// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// Explicitly set port without using environment variables
const PORT = 8000;

// Create server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.yellow.bold);
});

// Socket.IO configuration
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3008", "http://localhost:3009"],
    credentials: true,
  },
});

// Socket event handlers
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
=======
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
>>>>>>> 652ec256d84570cee906d4d35137ee8de1053b07
}); 