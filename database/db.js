const mongoose = require("mongoose");

// define the MongoDB connection URL
// const mongoURL = "mongodb://127.0.0.1:27017/hotels";
const mongoURL =
  "mongodb+srv://priyanshuchaudhary1000:5ufp9TYBT6cpNJT5@cluster0.cjvgh.mongodb.net/";

// setup the MongoDB connection

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// get the default connection
// mongoose maintains a default connectionobject representing the MongoDB connection.

const db = mongoose.connection;

// define event listeners for MongoDB connection

db.on("connected", () => {
  console.log("Connected to the MongoDB Server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from the MongoDB Server");
});

//export the database connection
module.exports = db;
