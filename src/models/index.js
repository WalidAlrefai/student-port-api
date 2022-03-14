'use strict';
require('dotenv').config();
const {Sequelize,DataTypes} = require('sequelize');
const users = require('./student-model');


const DATABASE_URL =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

  
let sequelizeOptions =
process.env.NODE_ENV === "production"
  ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  : {};

  let sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);

  module.exports ={
      db:sequelize , 
      users : users(sequelize,DataTypes)
  }