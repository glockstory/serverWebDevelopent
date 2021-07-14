const express =  require ('express')
const app = express ()
const bodyParser = require('body-parser')
require('./mongodb')
const activityModel = require('./models')
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
    res.send(activities)
})

app.get('/activity/:id', async (req, res)=>{
    const id = req.params.id

    const activity = await activityModel.findOne({
        _id: id
    })

    if (activity){
        res.send(activity)
    } else {
        res.status(404).send('Activity not found')
    }

})

// Валидация

const authMiddleware = (req,res,done) => {
    
}

// put - обновление активностей
app.put('/activity',(req,res) => {
    const {name, time, pictogram, repeat, remind} = req.body

    if(!name || !time || !pictogram){
        res.status(500).send('Name or time or pictogram is empty')
    } else {
        activityModel.save({
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