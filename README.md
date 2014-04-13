<h3>PGA Tournament Pool</h3>
April 13, 2014

<i>Tech Needed</i><br>
NodeJS - http://nodejs.org/<br>
npm - http://howtonode.org/introduction-to-npm

To run this app locally, first perform an <code>npm install</code><br>
From here, all you have to do is run <code>node app.js</code>

<code>npm install</code> will install these modules:
Express: http://expressjs.com
jsdom: https://github.com/tmpvar/jsdom
Handlebars.js: http://handlebarsjs.com
node-cron: https://github.com/ncb000gt/node-cron

Once you've started the app (<code>node app.js</code>), the Cron job will run at the beginning of every minute.
This Cron job will grab player scores from http://sports.yahoo.com/golf/pga/leaderboard 
...and then display them to localhost:3000

Scores get updated on the server side (every minute, as noted above).
To see the updates, you'll need to refresh localhost:3000 in your browser.
