//imports
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost:27017/parkingSystem`, {})
.then(success => console.log("Connected to Mongodb"))
.catch(err => console.log(err));

module.exports = {
    mongoose
};