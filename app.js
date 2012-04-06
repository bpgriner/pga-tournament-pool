/*var express = require('express'),
 gaas = require('./lib/gaas');


 // globals
 GLOBAL.conf = require('./gaas.conf').conf;

 var app = module.exports = express.createServer();

 var app = require('express').createServer();

 app.get('/', function(req, res){
 res.contentType('htm');
 console.log(app.settings);
 res.send(JSON.stringify(req.query),200);
 });

 app.listen(3000);

 console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
 */

var http = require('http');

// To reduce dependencies, hijacked this straight from
// Marak's color.js module
// https://github.com/Marak/colors.js/blob/master/colors.js

var httpOptions = {
    'host': 'majorschampionships.com',
    'port': 80,
    'path': '/masters/2012/scoring/'
};

http.get(httpOptions, function(res) {

    res.on('data',function(data) {

        console.log(res);

        //console.log(data);

        //var json = JSON.parse(data);
    });

    res.on('error',function(data) {
        console.log('Could not get update!');
    });

}).on('error', function(e) {
        console.log('Could not get update!');
    });