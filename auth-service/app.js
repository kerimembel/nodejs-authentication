require("dotenv").config();
require("./config/database.config").connect();
const express = require("express");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json());


// Route for the auth operations
app.use('/auth', require('./route/auth.route'));

// 404 Error handling
app.use("*", (req, res) => {
  res.status(404).json({
    status: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;