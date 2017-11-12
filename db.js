const mongoose = require('mongoose');

mongoURI = 'mongodb://bryan:bryan@ds141524.mlab.com:41524/partydb'; 
mongoose.connect(mongoURI, {useMongoClient: true});

var db = mongoose.connection;
db.on('error', function(err) {
  console.log('Mongodb connection error' + err);
});
db.on('connected', function() {
  console.log('Mongodb connection open');
});

module.exports = db;

