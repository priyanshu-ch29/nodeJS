const express = require("express");
const app = express();
const db = require("./database/db");
const morgan = require("morgan");
const passport = require("./auth"); // passport js is designed for authentication using password and username
const bodyParser = require("body-parser");
const hotelRoutes = require("./api/routes/hotelRoutes");
const personRoutes = require("./api/routes/personRoutes");
const menuItemRoutes = require("./api/routes/menuItemRoutes");
const person = require("./api/models/person");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(morgan("dev"));
app.use(bodyParser.json()); // req.body

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });

app.use("/hotel", hotelRoutes);
app.use("/person", localAuthMiddleware, personRoutes);
app.use("/menuItem", menuItemRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Success",
  });
});

app.listen(PORT, () => {
  console.log("Listening to port 3000");
});
