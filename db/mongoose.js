//imports
var mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`, {})
.then(success => console.log("Connected to Mongodb"))
.catch(err => console.log(err));

module.exports = {
    mongoose
};