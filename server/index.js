require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 8000;
const database = process.env.DATABASE;

const usersRoutes = require("./routes/users");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Success",
  });
});

app.use("/api", usersRoutes);

// Database connection
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    // Running port
    app.listen(port, () => {
      console.log(`App is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
