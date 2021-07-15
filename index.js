const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./mongodb');
const activityModel = require('./models');
app.use(bodyParser.json());
const moment = require('moment');
const getWeek = require('./utils/getWeek');
const DATE_FORMAT = require('./constants/DateFormat');

// GET /week/:weekNumber/:year
app.get('/week/:weekNumber/:year', async (req, res) => {
  const { weekNumber, year } = req.params;
  const activities = await activityModel.find();

  res.status(200).send(getWeek(activities, Number(weekNumber), Number(year)));
});

// GET /:id - Чтение активности. При запросе должен лететь весь набор полей записи
app.get('/activity/:id', async (req, res) => {
  const id = req.params.id;
  const activity = await activityModel.findOne({
    _id: id,
  });

  if (activity) {
    res.status(200).send(activity);
  } else {
    res.status(404).send('Activity not found');
  }
});

// POST /activity - создание
app.post('/activity', (req, res) => {
  const { name, time, pictogram, repeat, remind, date } = req.body;

  if (!name || !time || !date) {
    res.status(500).send('Name or time or date or pictogram is empty');
  } else {
    activityModel.create({
      name,
      time: time.start + '-' + time.end,
      pictogram,
      repeat,
      remind,
      date,
    });
    res.status(200).send('Activity is added');
  }
});

// GET /day/:date - Получение списка активностей текущего дня. Передаем все данные активностей
app.get('/day/:date', async (req, res) => {
  const { date } = req.params;
  const week = moment(date, DATE_FORMAT).isoWeek();
  const year = moment(date, DATE_FORMAT).year();
  const activities = await activityModel.find();

  const day = getWeek(activities, week, year).find(
    (item) => item.date === date
  );

  return res.status(200).send(day);
});

// DELETE /:id - Удаление активности
app.delete('/activity/:id', (req, res) => {
  const id = req.params.id;

  activityModel.findByIdAndDelete(id, function (err) {
    if (err) return console.log(err);

    res.status(200).send('Activity deleted');
  });
});

// PUT /:id - Обновление активности
app.put('/activity/:id', (req, res) => {
  const { name, time, pictogram, repeat, remind, date } = req.body;
  const id = req.params.id;

  activityModel.findByIdAndUpdate(
    id,
    {
      name,
      time: time.start + '-' + time.end,
      pictogram,
      repeat,
      remind,
      date,
    },
    function (err) {
      if (err) return console.log(err);

      res.status(200).send('Activity is updated');
    }
  );
});

app.listen(process.env.PORT || 3000);
