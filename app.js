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

// Start request
rest.get(url).on('complete', function(result){

    call_jsdom(result, function (window) {
        var $ = window.$;

        var rowsOfPlayers = []; // holds all players in the field
        var fullLeaderBoard = $('table.shadowboxTable_596 tbody:nth-child(4) tr').map(function() {
            var player = $(this).find('td').map(function() {
                return $(this).html();
            }).get();
            rowsOfPlayers.push(player); // push HTML surrounding player's info into array

            /*var playerName = $(this).find('a:nth-child(2)').map(function() {
                return $(this).html();
            }).get();
            console.log('playerName = '+playerName);*/
        }).get();

        //console.log(secondTable);

        for(var i=0;i<rowsOfPlayers.length;i++){ // traverse through each HTML grouping that represents a player's stats
            var playerInfo = rowsOfPlayers[i];
            var pos = String(playerInfo[0].substr(0,1));
            //console.log("playerInfo = "+playerInfo);
            //console.log('pos = '+pos);
            //console.log('playerInfo[0] = '+playerInfo[0]);
            switch(pos) {
                case "T":
                    //console.log("T");
                    break;
                case "C":
                    //console.log("C");
                    break;
                case "W":
                    //console.log("W");
                    break;
                default :
                    //console.log("-",pos,"-");
            }
        }

       // Current playerRow is...

// [ 'T57',
//     '\n                     <span style="color: rgb(0, 51, 153);">-</span>\n                  ',
//     '\n                     <a href="javascript:void(0);" onclick="addRow(this.parentNode.parentNode.id, false)">\n                        <img class="imgAddRemove" name="add" src="http://i.cdn.turner.com/pgatour/cs/sites/cdnassets/events/template/2010/img/add.png" alt="">\n                     </a>\n                     <img class="flag" src="http://i.cdn.turner.com/pgatour/cs/sites/cdnassets/global/img/flags/ARG.gif" alt="ARG">\n                     <a href="/masters/2012/scoring/scorecards/index.cfm?id=20848">Angel Cabrera</a>\n                     <img style="margin-left: 10px;" src="http://i.cdn.turner.com/pgatour/.element/img/1.0/main/titleist_38x11.gif" alt="Titleist">\n                  ',
//     '+5',
//     '9:25 am ET',
//     '-',
//     '71',
//     '78',
//     '-',
//     '-',
//     '149' ],

        
    });

});



