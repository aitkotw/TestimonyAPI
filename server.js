require("dotenv").config();
var express = require("express");
const helmet = require("helmet");
var fs = require("fs");
var path = require("path");
const cors = require("cors");

// Common Imports
const database = require("./Middleware/Database.middleware");

// Routes Import
var testRouter = require("./Routes/testimony.routes");

// Initialize Express
var app = express();
var port = process.env.PORT || 4001;

// App Middlewares
app.use(helmet());
app.use(cors());
app.use(database);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// API Routes
app.use("/api", testRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({
    message: "404 No such route exists",
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: "Internal Server Error",
  });
});

// START THE SERVER
app.listen(port, () => {
  console.log(`Application Running on http://localhost:${port}`);
});
