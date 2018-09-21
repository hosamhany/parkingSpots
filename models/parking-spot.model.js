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
const ParkingSpot = mognoose.model('ParkingSpot', parkingSpotSchema);

module.exports = {
    ParkingSpot
}