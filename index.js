//imports
const express = require('express');
const _ = require('lodash');
const bodyParse = require('body-parser');
const { ObjectID } = require ('mongodb');
const { mongoose } = require('./db/mongoose');
//models

//initializing express framework
var app = express();

//setting the value of the port to run on
const port = process.env.port || 3000;
const hostname = '0.0.0.0';

//informing the app that it will be dealing with JSON data
app.use(bodyParse.json());

app.listen(port, hostname, () => {
    console.log(`started on port ${port}`);
});