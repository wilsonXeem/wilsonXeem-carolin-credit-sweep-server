const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const Users = require("./models/User");

dotenv.config();

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, , X-Requested-With, Origin, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.get("/", (req, res, next) => res.send("Hello world !!!"));
app.use("/api/auth", auth);
app.use("/api/user", async (req, res) => {
  const users = await Users.find();
  res.send(users);
});

// connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("database connect successfully"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 4000, () => console.log("server started"));

module.exports = app;
