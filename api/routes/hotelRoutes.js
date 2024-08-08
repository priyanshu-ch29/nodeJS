const express = require("express");
const app = express.Router();

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET request to /hotel",
  });
});

app.post("/", (req, res, next) => {
  const hotel = {
    name: req.body.name,
    address: req.body.address,
  };
  res.status(200).json({
    message: "Handling POST request to /hotel",
    createdHotel: hotel,
  });
});

app.get("/:hotelId", (req, res, next) => {
  const id = req.params.hotelId;
  if (id === "pizza") {
    res.status(200).json({
      message: "It is a special hotel",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "it is a normal hotel",
    });
  }
});

module.exports = app;
