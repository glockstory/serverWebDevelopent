const express =  require ('express')
const app = express ()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// get week:

app.get('/week', (req,res) => {
    res.send({
        numberWeek: 2
    })
    
})

app.get('/activity',(req,res)=> {

    res.send({
        name: "Misha",
        pictogram: "http://что-то там/",
        repeat:" ",
        remind: "Напоминание"
    })
})

// Валидация

const authMiddleware = (req,res,done) => {
    
}

// put - обновление активностей
app.put('/activity',(req,res) => {

 

})

app.listen(process.env.PORT || 3000)