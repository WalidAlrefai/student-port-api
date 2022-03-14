"use strict";

const { users } = require("../models/index");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/signup", signupHandler);

async function signupHandler(req, res) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const user = await users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;
