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

const daySchema = new Schema({
    name: String,
    date: String,
    activities: [{type: Schema.Types.ObjectId, ref:'activity'}]
})


const weekSchema = new Schema({
    // week:{ 
    // type: array, 
    // min: 1,
    // max: 52
    
// }
});


module.exports = mongoose.model('activity', activitySchema)
module.exports = mongoose.model('day', daySchema)
// module.exports = mongoose.model('week', weekSchema)
