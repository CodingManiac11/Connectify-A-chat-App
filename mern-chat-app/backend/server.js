const express = require("express");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Initialize express
const app = express();

// Connect to MongoDB first
console.log("Connecting to local MongoDB...");
connectDB();

app.use(express.json()); // to accept json data

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

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
}); 