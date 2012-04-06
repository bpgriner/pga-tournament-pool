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
    jsdom = require('jsdom');

function call_jsdom(source, callback) {
    jsdom.env(
        source,
        [ 'jquery.min.js' ],
        function(errors, window) {
            process.nextTick(
                function () {
                    if (errors) {
                        throw new Error("There were errors: "+errors);
                    }
                    callback(window);
                }
            );
        }
    );
}

// Start request
rest.get('http://www.majorschampionships.com/masters/2012/scoring/').on('complete', function(result){
 
    call_jsdom(result, function (window) {
        var $ = window.$;

        // Now we can query with jQuery

        var title = $("title").text();
        $("h1").text(title);

        console.log(title);
    });

});




