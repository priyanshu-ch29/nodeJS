const express = require("express");
const app = express.Router();
const person = require("../models/person");

app.get("/", async (req, res, next) => {
  try {
    const data = await person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

app.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const newPerson = new person(data);

    const savePerson = await newPerson.save();
    console.log("data saved");
    res.status(200).json(savePerson);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

app.get("/:workType", async (req, res, next) => {
  try {
    const workType = req.params.workType;
    const validWorkTypes = ["chef", "waiter", "manager"];
    if (validWorkTypes.includes(workType)) {
      const response = await person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: "Invalid workType",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

module.exports = app;
