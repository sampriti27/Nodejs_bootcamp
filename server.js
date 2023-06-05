// Creating a server in express

const express = require("express"); // require the express package
const errorHandler = require("./middleware/errorhandler");

const dotenv = require("dotenv").config(); // initilize dotenv

const app = express(); // keep the express in app

const port = process.env.PORT || 5000; // declare a port

// Db Connection
const connectDB = require("./config/db");
connectDB();

app.use(express.json()); // helps to parse the data stream that we recieve on the server side.
app.use("/api/contacts", require("./routes/contactRoutes")); //middleware for creating contact routes
app.use("/api/users", require("./routes/userRoutes")); //middleware for creating user routes
app.use(errorHandler);

// app listens to the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
