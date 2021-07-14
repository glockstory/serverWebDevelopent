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

app.get('/activity/:id', (req, res)=>{
    const id = req.params.id


})

// Валидация

const authMiddleware = (req,res,done) => {
    
}

// put - обновление активностей
app.put('/activity',(req,res) => {

 

})

app.listen(process.env.PORT || 3000)