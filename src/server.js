"use strict";

const express = require("express");
const app = express();
const error404 = require("./error-handler/404.js");
const error500 = require("./error-handler/500");
const signin = require("./routers/signin");
const signup = require("./routers/signup");

app.use(express.json());
app.use(signin);
app.use(signup);

function start(port) {
  app.listen(port, () => {
    console.log(`listen to port ${port} `);
  });
}

app.use(error500);
app.use("*", error404);
module.exports = {
  app: app,
  start: start,
};
