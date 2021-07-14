const express =  require ('express')
const app = express ()
const bodyParser = require('body-parser')
require('./mongodb')
const activityModel = require('./models')
const { ObjectID } = require('mongodb')
app.use(bodyParser.json())

// get week:

app.get('/week', (req,res) => {
    res.send({
        numberWeek: 2
    })
    
})

// поиск всех активностей
app.get('/activities', async (req, res)=> {
    const activities = await activityModel.find({})
    res.status(200).send(activities)
})

app.get('/activity/:id', async (req, res)=>{
    const id = req.params.id

    const activity = await activityModel.findOne({
        _id: new ObjectID(id)
    })

    if (activity){
        res.status(200).send(activity)
    } else {
        res.status(404).send('Activity not found')
    }

})

// Валидация

const authMiddleware = (req,res,done) => {
    
}

// put - обновление активностей
app.put('/activities/:id',(req,res) => {
    const {name, time, pictogram, repeat, remind} = req.body
    console.log(name, time, pictogram)
    if(!name || !time || !pictogram){
        res.status(500).send('Name or time or pictogram is empty')
    } else {
        activityModel.create({
            name,
            time,
            pictogram,
            repeat,
            remind
        })
        res.send('Activity is added')
    }
})

app.listen(process.env.PORT || 3000)