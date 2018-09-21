const { Driver } = require('../../models/driver.model');

function createDriver(body, callback, failure) {
    Driver.create({
        isReservingASpot: false,
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

function changeReservationStatusToTrue(body, callback, failure) {
    Driver.findById(body.driverId).then((res) => {
        if(res.isReservingASpot === true){
            failure("Driver already reserving a spot");
        }
        else {
            Driver.findByIdAndUpdate({_id: body.driverId}, {isReservingASpot: true, parkingSpotId: body.parkingSpotId}).then((res) => {
                if(res){
                    callback(res);
                }
                else {
                    failure("Driver not found");
                }
            }).catch((err => {
                failure(err);
            }))
        }
    }).catch((err) => {
        failure(err);
    })

}

function changeReservationStatusToFalse(body, callback, failure) {
    Driver.findById(body.driverId).then((res) => {
        if (res.isReservingASpot === false){
            failure("Driver is not reserving a parking spot");
        }
        else {
            Driver.findByIdAndUpdate({_id: body.driverId}, {isReservingASpot: false, $unset:{ parkingSpotId: 1 }}).then((res) => {
                if(res){
                    callback(res);
                }
                else {
                    failure("Driver not found");
                }
            }).catch((err => {
                failure(err);
            }))
        }
    })
    Driver.findByIdAndUpdate()
}

module.exports = {
    createDriver,
    changeReservationStatusToTrue,
    changeReservationStatusToFalse
    
}