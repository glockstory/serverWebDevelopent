const mongoose = require('mongoose')
const { Schema } = mongoose

const activitySchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    time: { type: String, default: Date.now },
    pictogram: String,
    repeat: String,
    remind: String,
});


