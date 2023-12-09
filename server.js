// Import express env mongoose User   bodyParser
const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const mongoose = require("mongoose");
const User = require("./models/User.js");
const bodyParser = require("body-parser");

// Middleware for parsing request bodies as JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB using the provided URI from the environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// Route to handle POST requests for creating a new user
app.post("/", async (req, res, next) => {
  const newUser = new User(req.body);
  try {
    // Save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "success" });
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).send(error);
  }
});

// Route to handle GET requests for retrieving all users
app.get("/", async (req, res, next) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});
    res.status(201).send(users);
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).send(error);
  }
});

// Route to handle PUT requests for updating a user by ID
app.put("/:id", async (req, res, next) => {
  try {
    // Find and update the user with the specified ID
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (!updateUser) {
      // If user not found, send a 404 response
      res.status(404).send("not found");
    }
    res.status(201).send(updateUser);
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).send(error);
  }
});

// Route to handle DELETE requests for deleting a user by ID
app.delete("/:id", async (req, res, next) => {
  try {
    // Find and delete the user with the specified ID
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(201).send("success");
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).send(error);
  }
});

// Set up the server to listen on the specified port from environment variables
const port = process.env.PORT;
app.listen(port, () => console.log("my server is running on part ", port));
