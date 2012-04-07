/**
 * User: Ben Griner & John DeBovis
 * Start Date: 4/6/12
 */

// ** This code is currently specific to the Masters 2012 leaderboard on majorchampionships.com
// TODO: If the HTML on majorchampionships.com is different for other tournaments, models for each of those
// TODO (cont): tournaments need to be made.

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

function parse_out_player(playerInfo,pos){
    player = {}
    var headers = ['pos','pos1','name','total','thru','today','1','2','3','4','total'];
    for(var i=0;i<playerInfo.length;i++){
        player[headers[i]] = playerInfo[i];
    }
    player['pos1'] = String(player['pos1']).replace(/^\s+|\s+$/g, '');
    player['name'] = String(player['name']).replace(/^\s+|\s+$/g, '');

    return player;
}


// Start request
rest.get(url).on('complete', function(result){

    call_jsdom(result, function (window) {
        var $ = window.$;

        var rowsOfPlayers = []; // holds all players in the field
        var fullLeaderBoard = $('table.shadowboxTable_596 tbody:nth-child(4) tr').map(function() {
            var player = $(this).find('td').map(function() {
                return $(this).text();
            }).get();
            rowsOfPlayers.push(player); // push HTML surrounding player's info into array

        }).get();


        var playersSet=[];

        for(var i=0;i<rowsOfPlayers.length;i++){ // traverse through each HTML grouping that represents a player's stats
            var playerInfo = rowsOfPlayers[i];
            var pos = String(playerInfo[0].substr(0,1));

            if(pos == "T" || pos == "C" || pos == "W"){
                playersSet.push(parse_out_player(playerInfo));
            }
        }
        console.log(playersSet[0]);

    });

});


