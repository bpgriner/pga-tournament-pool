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

var rest = require('restler'),
    jquery = require('jquery');

rest.get('http://www.majorschampionships.com/masters/2012/scoring/').on('complete', function(result){
 
    var scores = result;

    var tbl = $('table#myTable tr').map(function() {
            return $(this).find('td').map(function() {
              return $(this).html();
            }).get();
          }).get();



});
