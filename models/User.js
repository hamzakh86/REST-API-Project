// Importing the Mongoose library for MongoDB interaction.
const mongoose = require("mongoose");

// Defining the schema for the 'users' collection in MongoDB.
const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    age: Number,
});

// Exporting the Mongoose model for the 'users' collection, using the defined schema.
module.exports = mongoose.model("users", userSchema);
