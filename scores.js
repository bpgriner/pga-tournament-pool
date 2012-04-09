
var rest = require('restler'),
    jsdom = require('jsdom'),
    fs = require('fs'),
    url = 'http://www.majorschampionships.com/masters/2012/scoring/';


function call_jsdom(source, callback) {
    jsdom.env( source, [ 'jquery.min.js' ], function(errors, window) {
            process.nextTick( function () {
                    if (errors) {
                        throw new Error("There were errors: "+errors);
                    }
                    callback(window);
                });
        });
}

function parse_out_player(playerInfo,pos){
    var player = {}, name = '';
    var headers = ['pos','pos1','name','total','thru','today','round_1','round_2','round_3','round_4','round_total'];
    for(var i=0;i<playerInfo.length;i++){
        var key = headers[i];
        if(key == 'pos1' || key == 'name'){
            player[key] = String(playerInfo[i]).replace(/^\s+|\s+$/g, '');
        }
        else{
            player[key] = playerInfo[i];
        }
    }
    return [player,player['name']];
}

exports.getPlayers = function(){
    // Start request
    rest.get(url).on('success', function(result){
        var playersSet = {},rowsOfPlayers = [];
              
        call_jsdom(result, function (window) {
                var $ = window.$; 
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
                        var playerData = parse_out_player(playerInfo);
                        playersSet[playerData[1]] = playerData[0];
                    }
                }
                fs.writeFile("/Users/johndebovis/workspace/pga-tournament-pool/data.js",JSON.stringify(playersSet), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                }); 
        });
    });
}






