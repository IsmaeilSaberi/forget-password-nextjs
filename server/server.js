const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//mid
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is forget password's server!" });
});

//routes
const UserRoutes = require("./routes/UserRoutes");

//routes middleware
app.use("/api", UserRoutes);

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then((d) => app.listen(PORT))
  .catch((err) => console.log(err));
