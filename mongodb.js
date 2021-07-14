// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@realmcluster.vroin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
// mongodb+srv://Nikita:Dinkimom48@configurationmodule.yufbf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we connected')
});

module.exports = db;