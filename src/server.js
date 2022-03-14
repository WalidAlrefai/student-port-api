'use strict';

const express = require('express');
const app = express();


app.use(express.json());



function start(port) {
    app.listen(port, () =>{
        console.log(`listen to port ${port} `)
    })
}

module.exports ={
    app: app,
    start: start
};