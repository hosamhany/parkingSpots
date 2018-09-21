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
        }
    }).find((err, results) => {
        if (err) failure(err);
        else
        callback(results);
    })
}

module.exports= {
    createParkingSpot,
    getNearBySpots

}