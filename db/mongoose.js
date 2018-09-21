//imports
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
//TODO: change the localhost to the IP of the DB in the dockercompose file
mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`, {})
.then(success => console.log("Connected to Mongodb"))
.catch(err => console.log(err));

module.exports = {
    mongoose
};