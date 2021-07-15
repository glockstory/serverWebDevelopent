
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@realmcluster.vroin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we connected')
});

module.exports = db;
