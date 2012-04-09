/**
 * User: Ben Griner & John DeBovis
 * Start Date: 4/6/12
 */

// ** This code is currently specific to the Masters 2012 leaderboard on majorchampionships.com
// TODO: If the HTML on majorchampionships.com is different for other tournaments, models for each of those
// TODO (cont): tournaments need to be made.

var rest = require('restler'),
    jsdom = require('jsdom'),
    express = require('express'),
    scores = require('./scores'),
    url = 'http://www.majorschampionships.com/masters/2012/scoring/';


var app = express.createServer();  

//var playersScores = scores.getPlayers();


app.get('/', function(req, res){
    res.contentType('htm');
    res.send(JSON.stringify({}),200);
});

app.get('/reload', function(req, res){
    res.contentType('htm');
    scores.getPlayers();
    res.send(JSON.stringify({}),200);
});


app.listen(3000);

//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);


