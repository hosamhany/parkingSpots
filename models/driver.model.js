const mognoose = require('mongoose');

const ObjectId = mognoose.Schema.ObjectId;
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
    },
    parkingSpotId: {
        type: ObjectId,
        required: false
    }
});
//this is used to tell mongodb that we are using 2dsphere not a coordinates system.
driverSchema.index({location: "2dsphere" });

const Driver = mognoose.model('Driver', driverSchema);

module.exports= {
    Driver
};