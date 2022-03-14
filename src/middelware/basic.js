"use strict";

const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { users } = require("../models/index");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "thesecret";

async function basic(req, res, next) {
  const encoded = req.headers.authorization.split(" ").pop();
  let decoded = base64.decode(encoded);
  let [username, password] = decoded.split(":");
  try {
    const user = await users.findOne({ where: { username: username } });

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      let exp = Math.floor(Date.now() / 1000) + 900;
      let newToken = jwt.sign({ exp: exp, username: user.username }, SECRET);
      user.token = newToken;
      res.status(200).json(user);
      next();
    } else {
      res.status(403).send("user is not valid");
    }
  } catch (e) {
    res.status(403).send("user is not valid");
  }
}

module.exports = basic;
