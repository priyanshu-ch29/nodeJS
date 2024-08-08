const express = require("express");
const app = express();
const db = require("./database/db");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const hotelRoutes = require("./api/routes/hotelRoutes");
const personRoutes = require("./api/routes/personRoutes");
const menuItemRoutes = require("./api/routes/menuItemRoutes");

app.use(morgan("dev"));
app.use(bodyParser.json()); // req.body
app.use("/hotel", hotelRoutes);
app.use("/person", personRoutes);
app.use("/menuItem", menuItemRoutes);

app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Success",
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
