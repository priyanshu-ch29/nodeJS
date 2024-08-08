const express = require("express");
const app = express.Router();
const menuItem = require("../models/menuItem");

app.get("/", async (req, res, next) => {
  try {
    const menuData = await menuItem.find();
    res.status(200).json(menuData);
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
    const menu = new menuItem(data);

    const menuData = await menu.save();
    res.status(200).json(menuData);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
});

app.get("/:taste", async (req, res, next) => {
  try {
    const tasteTpye = req.params.taste;
    const validTasteTpye = ["sweet", "spicy", "sour"];
    if (validTasteTpye.includes(tasteTpye)) {
      const response = await menuItem.find({ taste: tasteTpye });
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: "Invalid taste",
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
