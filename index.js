//imports
const express = require('express');
const _ = require('lodash');
const bodyParse = require('body-parser');
const { ObjectID } = require ('mongodb');
const { mongoose } = require('./db/mongoose');

//models
const { Driver} = require('./models/driver.model');
const { ParkingSpot } = require('./models/parking-spot.model');

//importing Managers
const ParkingManager = require('./managers/parkingSpot/parking-spot.manager');
const DriverManager = require('./managers/driver/driver.manager');

//initializing express framework
var app = express();

//setting the value of the port to run on
const port = process.env.port || 3000;
const hostname = '0.0.0.0';

//informing the app that it will be dealing with JSON data
app.use(bodyParse.json());

//Endpoints
app.get('/isAlive', (req, res) => {
    res.send("OK");
});

//ParkingSpots endpoints
app.post('/parkingSpot/create', (req, res) => {
    var body = _.pick(req.body, ['isFree', 'coordinates']);
    ParkingManager.createParkingSpot(body, ((response) => {
        res.status(200).send("OK");
    }), (err) => {
        res.status(500).send(err);
    })
});

app.post('/parkingSpot/getNearSpots', (req, res) => {
    var body = _.pick(req.body, ['driverCoordinates']);
    console.log(body);
    ParkingManager.getNearBySpots(body,((response) => {
        res.status(200).send(response);
    }),(err) => {
        res.status(500).send(err);
    })
});
//Drivers endpoints
app.post('/driver/create', (req, res) => {
    var body = _.pick(req.body, ['isReservingASpot', 'coordinates']);
    DriverManager.createDriver(body, ((response) => {
        res.status(200).send(response);
    }), (err) => {
        res.status(500).send(err);
    })
})


app.listen(port, hostname, () => {
    console.log(`started on port ${port}`);
});