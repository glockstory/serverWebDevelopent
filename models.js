const mongoose = require('mongoose')
const { Schema } = mongoose

const activitySchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    time: { type: String, default: Date.now },
    pictogram: String,
    repeat: String,
    remind: String,
});


const weekSchema = new Schema({
    week:{ 
    type: array, 
    min: 1,
    max: 52
    
}
});


module.exports = activitySchema

module.exports = weekSchema
