const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  // hash the generated password only if it has been modified or is new
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Person", personSchema);

// mongoose.model Function: This function is used to create a model in Mongoose
// First Argument ("Person"): This is the name of the model
// Second Argument (personSchema): This is the schema you defined earlier.
// It outlines the structure of the documents in the people collection,
// specifying the fields and their data types, along with any constraints (e.g., required fields, unique fields, enum values).
