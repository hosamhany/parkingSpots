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

module.exports = {
    createDriver
}