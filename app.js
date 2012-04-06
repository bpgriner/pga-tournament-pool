/**
 * User: Ben Griner & John DeBovis
 * Start Date: 4/6/12
 */

var rest = require('restler'),
    jsdom = require('jsdom'),
    url = 'http://www.majorschampionships.com/masters/2012/scoring/';


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
rest.get(url).on('complete', function(result){

    call_jsdom(result, function (window) {
        var $ = window.$;

        var i=0;
        // Now we can query with jQuery
        var tbl = $('table.shadowboxTable_596 tbody tr').map(function() {
            var player = {};
            // Build player
            player[i] = $(this).find('td').map(function() {
                return $(this).html();
            }).get();
            i++;
            return player;
        }).get();

        //console.log(tbl);

        // trying some other things here
        var secondTable = $('table.shadowboxTable_596 tbody:nth-child(4)').map(function() {

            var tableRow = $(this).find('tr').map(function() {
                return $(this).html();
            }).get();

            return tableRow;

        }).get();

        console.log(secondTable);
    });

});