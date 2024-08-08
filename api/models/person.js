const mongoose = require("mongoose");

// define the person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

// mongoose.model Function: This function is used to create a model in Mongoose
// First Argument ("Person"): This is the name of the model
// Second Argument (personSchema): This is the schema you defined earlier.
// It outlines the structure of the documents in the people collection,
// specifying the fields and their data types, along with any constraints (e.g., required fields, unique fields, enum values).

module.exports = mongoose.model("Person", personSchema);
