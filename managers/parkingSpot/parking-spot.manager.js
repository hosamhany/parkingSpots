const { ParkingSpot } = require('../../models/parking-spot.model');

function createParkingSpot(body, callback, failure) {
    ParkingSpot.create({
        isFree: body.isFree,
        location:{
            type: 'Point',
            coordinates: body.coordinates
        }
    }).then((res) => {
        if(res){
            callback(res);
        } else{
            failure(null);
        }
    }).catch((err) =>{
        failure(err);
    });
}

function getNearBySpots(body, callback, failure) {
    ParkingSpot.find({
        location:{
            $near: {
                $maxDistance: 1000,
                $geometry:{
                    type: "Point",
                    coordinates: body.driverCoordinates
                }
            }
        },
        isFree: true
    }).find((err, results) => {
        if (err) failure(err);
        else
        callback(results);
    })
}

function changeReservationStatusToTrue(body, callback, failure){
    ParkingSpot.findById(body.parkingSpotId).then((response) => {
        if(response.isFree === false ){
            failure("Parking spot already taken");
        }
        else {
            ParkingSpot.findByIdAndUpdate({_id: body.parkingSpotId} , { isFree: false, driverParkingId: body.driverId}).then((res) => {
                if(res){
                    callback("OK");
                } 
                else {
                    failure("Parking spot not found")
                }
            }).catch((err) => {
                failure(err);
            })
        }
    }).catch((err) => {
        failure(err);
    })
}

function changeReservationStatusToFalse(body, callback, failure){
    ParkingSpot.findById(body.parkingSpotId).then((response) => {
        if(response.isFree === true ){
            failure("Parking spot already free");
        }
        else {
            ParkingSpot.findByIdAndUpdate({_id: body.parkingSpotId} , { isFree: true, $unset:{ driverParkingId:1 }}).then((res) => {
                if(res){
                    callback(res);
                } 
                else {
                    failure("Parking spot not found")
                }
            }).catch((err) => {
                failure(err);
            })
        }
    }).catch((err) => {
        failure(err);
    })
}

module.exports= {
    createParkingSpot,
    getNearBySpots,
    changeReservationStatusToTrue,
    changeReservationStatusToFalse
}