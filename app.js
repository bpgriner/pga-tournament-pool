// express
var express = require('express');
var app = express();

// handlebarsjs
var hbs = require('hbs');

// node-cron
var CronJob = require('cron').CronJob;

// pgaScores.js
var pgaScores = require('./pgaScores.js');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
//app.use(express.bodyParser());

var scores;

// get new scores every minute
new CronJob('0 * * * * *', function(){
  scores = pgaScores.getScores();
}, null, true, null);

app.get('/', function(request, response) {
    response.render('index',
      {
        title: "Masters 2014",
        scores: scores
      });
});

app.listen(3000);
