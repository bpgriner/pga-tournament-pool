var jsdom = require("jsdom");

exports.getScores = function() {

  console.log("--");
  console.log("Grabbing scores...");
  var playersAndScores = [];

  jsdom.env(
    "http://sports.yahoo.com/golf/pga/leaderboard",
    ["http://code.jquery.com/jquery.js"],
    function (errors, window) {

      var playerRows = window.$("div#leaderboardtable table.sportsTable tbody tr");
      console.log("There are", playerRows.length, "player rows.");

      playerRows.each(function() {

        var playerName = window.$(this).find("td.player a").text();
        var playerScore = window.$(this).find("td.total").text().trim();

        if (playerScore == "-") {
          playerScore = "MC";
        }

        var playerJson = {
          player: playerName,
          score: playerScore
        }

        playersAndScores.push(playerJson);
      });    

      console.log("There are", playersAndScores.length, "players with scores.");
      console.log("Finished grabbing scores.");
    }
  );

  return playersAndScores;
};
