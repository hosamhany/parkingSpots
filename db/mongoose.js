//imports
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
//TODO: change the localhost to the IP of the DB in the dockercompose file
mongoose.connect("mongodb://localhost:27017/parkingSystem", {});

module.exports = {
    mongoose
};