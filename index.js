const express =  require ('express')
const app = express ()
const bodyParser = require('body-parser')
require('./mongodb')
const activityModel = require('./models')
const { ObjectID } = require('mongodb')
app.use(bodyParser.json())
const moment = require('moment')

// get week:
app.get('/:week', async (req,res) => {
    const {week, year} = req.body
    week = getDateRangeFromWeek(week, year)

    const activities = await activityModel.find({})

    res.status(200).send(getWeek(activities, week, year))
})

// поиск всех активностей
app.get('/activities', async (req, res)=> {
    const activities = await activityModel.find({})
    res.status(200).send(activities)
})

//GET /:id - Чтение активности. При запросе должен лететь весь набор полей записи
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

// put = обновление активностей (исправить)
app.post('/activities/:id',(req,res) => {
    const {name, time, pictogram, repeat, remind, date} = req.body
    console.log(name, time, pictogram, date)
    if(!name || !time || !pictogram || !date){
        res.status(500).send('Name or time or date or pictogram is empty')
    } else {
        activityModel.create({
            name,
            time,
            pictogram,
            repeat,
            remind,
            date
        })
        res.status(200).send('Activity is added')
    }
})

//GET /:day - Получение списка активностей текущего дня. Передаем все данные активностей
app.get('/:day', async (req, res)=>{

})

// DELETE /:id - Удаление активности
app.delete('/activity/:id', (req,res) => {
    const id  = req.params.id
    activityModel.findByIdAndDelete(id, function (err) {
        if (err) return console.log(err);
        res.status(200).send('Activity deleted')
      });
})

// PUT /:id - Обновление активности
app.put('/activity/:id', (req,res) => {
    const {name, time, pictogram, repeat, remind, date} = req.body
    const id  = req.params.id
    activityModel.findByIdAndUpdate(id,{name,time,pictogram,repeat,remind, date}, function (err) {
        if (err) return console.log(err);
        res.status(200).send('Activity is updated')
      });

})
app.listen(process.env.PORT || 3000)

// Веселые вещи
function getDateRangeFromWeek(weekNumber, year) {
    const MONDAY = moment().day("Monday").year(year).week(weekNumber);
    const DAYS = [MONDAY];
  
    for (let i = 1; i < 7; i++) {
      const DAY = moment(MONDAY).add(i, "days");
      DAYS.push(DAY);
    }
  
    return DAYS.map((day) => day.format("DD.MM.YYYY"));
  }
  
  function getWeek(activities, weekNumber, year) {
    const PERIODS = [
      "9:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
      "20:00-21:00"
    ];
  
    const DAYS = getDateRangeFromWeek(weekNumber, year);
  
    const WEEK = DAYS.map((day) => {
      const DAY = {
        date: day,
        activities: {}
      };
  
      for (let i = 0; i < PERIODS.length; i++) {
        const PERIOD = PERIODS[i];
        const [PERIOD_START] = PERIOD.split("-");
  
        const FOUND_ACTIVITY = activities.find(
          (activity) =>
            activity.date === DAY.date &&
            activity.time.search(`${PERIOD_START}-`) !== -1
        );
  
        if (FOUND_ACTIVITY) {
          DAY.activities[FOUND_ACTIVITY.time] = FOUND_ACTIVITY;
  
          const PERIOD_END = FOUND_ACTIVITY.time.split("-")[1];
  
          const NEXT_PERIOD = PERIODS.find(
            (period, index) => period.search(`${PERIOD_END}-`) !== -1
          );
  
          if (NEXT_PERIOD) {
            i = PERIODS.indexOf(NEXT_PERIOD) - 1;
          } else {
            i = PERIODS.length;
          }
        } else {
          DAY.activities[PERIOD] = null;
        }
      }
  
      return DAY;
    });
  
    return WEEK;
  }
