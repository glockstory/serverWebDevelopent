const { ObjectID } = require('mongodb');
const mongoose = require('mongoose')
const { Schema } = mongoose

const activitySchema = new Schema({
    name:  String,
    time: {start: String, end: String},
    pictogram: String,
    repeat: String,
    remind: String,
});


module.exports = mongoose.model('activity', activitySchema)
//module.exports = mongoose.model('day', daySchema)
// module.exports = mongoose.model('week', weekSchema)
