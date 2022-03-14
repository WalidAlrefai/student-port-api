"use strict";

const express = require("express");
const app = express();
const error404 = require("./error-handler/404.js");
const error500 = require("./error-handler/500");
const signin = require("./routers/signin");
const signup = require("./routers/signup");
const users = require("./routers/users");

app.use(express.json());
app.use(signin);
app.use(signup);
app.use(users);

function start(port) {
  app.listen(port, () => {
    console.log(`listen to port ${port} `);
  });
}

app.get('/',(req,res)=>{
  res.send('server is alive')
})

app.use(error500);
app.use("*", error404);
module.exports = {
  app: app,
  start: start,
};
