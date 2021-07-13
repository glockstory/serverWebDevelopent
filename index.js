const express =  require ('express')

const app = express ()


app.get('/activity',(req,res)=> {

    res.send({
        name: "Misha",
        pictogram: "http://что-то там/",
        repeat:" ",
        remind: "Напоминание"
    })
})

app.listen(process.env.PORT || 3000)