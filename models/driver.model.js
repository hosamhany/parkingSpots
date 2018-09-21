const mognoose = require('mongoose');

const driverSchema = new mognoose.Schema({
    isReservingASpot:{
        type: Boolean,
        default: false
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
const Driver = mognoose.model('Driver', driverSchema);

module.exports= {
    Driver
};