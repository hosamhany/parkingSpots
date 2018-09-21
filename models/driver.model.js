const mognoose = require('mongoose');

const driverSchema = new mognoose.Schema({
    reservingASpot:{
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
const driver = mognoose.model('Driver', driverSchema);

module.exports= {
    driver
};