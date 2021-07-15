const { ObjectID } = require('mongodb');
const mongoose = require('mongoose')
const { Schema } = mongoose

const activitySchema = new Schema({
    // 2021:06:03:18:15
    name:  String,
    time: String,
    pictogram: String,
    repeat: String,
    remind: String,
    date: String
});
module.exports = mongoose.model('activity', activitySchema)

