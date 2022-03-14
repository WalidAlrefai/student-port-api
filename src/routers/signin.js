"use strict";

const express = require("express");
const router = express.Router();
const basic = require("../middelware/basic");

router.post("/signin", basic, signinHandler);

async function signinHandler(req, res) {
  await res.status(200).json(req.user);
}

module.exports = router;
