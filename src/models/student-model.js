"use strict";

require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "thesecret";

const Users = (sequelize, DataTypes) =>
  sequelize.define("users", {
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    username: {
      type: DataTypes.STRING,
      alloNull: false,
    },
    password: {
      type: DataTypes.STRING,
      alloNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "admin"),
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
    actions: {
      type: DataTypes.VIRTUAL,
      get() {
        const acl = {
          student: ["read", "update"],
          admin: ["read", "update", "delete"],
        };

        return acl[this.role];
      },
    },
  });

module.exports = Users;
