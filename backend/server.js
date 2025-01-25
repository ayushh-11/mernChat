const { app, server } = require("./socket/socket");
const path = require("path")
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const connection = require("./db/connection");


dotenv.config(); // Load environment variables

// Middleware
app.use(express.json()); // For parsing JSON
app.use(cors({
    origin: "https://mernchat-ulpl.onrender.com/",
    credentials: true,
}));

// Session Configuration
app.use(session({
    name: 'app.sid',
    secret: "1234567890QWERTY", // Use environment variable
    resave: true,
    saveUninitialized: true,
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/", userRoutes);

app.use(express.static(path.join("frontend/dist")))

app.get("*", (req, res) => {
	res.sendFile(path.join("frontend", "dist"));
});

// Start the Server
const port = process.env.PORT || 5000; // Use fallback if PORT is not defined
server.listen(port, () => {
    connection(); // Initialize DB connection
    console.log(`Server started on port ${port}`);
});
