
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
    var headers = ['pos','pos1','name','total','thru','today','1','2','3','4','round_total'];
    for(var i=0;i<playerInfo.length;i++){
        var key = headers[i];
        if(key == 'pos1' || key == 'name'){
            player[key] = String(playerInfo[i]).replace(/^\s+|\s+$/g, '');
        }
        else{
            player[key] = playerInfo[i];
        }
    }
    return player;
}


exports.getPlayers = function(){
    var playersSet=[];
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

            for(var i=0;i<rowsOfPlayers.length;i++){ // traverse through each HTML grouping that represents a player's stats
                var playerInfo = rowsOfPlayers[i];
                var pos = String(playerInfo[0].substr(0,1));

                if(pos == "T" || pos == "C" || pos == "W"){
                    playersSet.push(parse_out_player(playerInfo));
                }
            }
        });

    });
    console.log(playersSet);
    return playersSet;
}


