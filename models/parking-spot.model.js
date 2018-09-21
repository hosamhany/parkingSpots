const mognoose = require('mongoose');

const parkingSpotSchema = new mognoose.Schema ({
    isFree:{
        type: Boolean,
        default: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});
//this is used to tell mongodb that we are using 2dsphere not a coordinates system.
parkingSpotSchema.index({location: "2dsphere" });

const ParkingSpot = mognoose.model('ParkingSpot', parkingSpotSchema);

module.exports = {
    ParkingSpot
}