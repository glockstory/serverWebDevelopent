const { ObjectID } = require('mongodb');
const mongoose = require('mongoose')
const { Schema } = mongoose

const activitySchema = new Schema({
    name:  String,
    time: {start: String, end: String},
    pictogram: String,
    repeat: String,
    remind: String,
    date: String
});
module.exports = mongoose.model('activity', activitySchema)

