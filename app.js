// /* server.js */
// 'use strict';

// const express = require('express');
// const reload = require('reload');
// const slackEventListener = require('./slackEventListener');
// const app = express();
// const port = process.env.PORT || 4205;
// const router = express.Router();



/*
	Credit to joshuakarjala
	https://gist.github.com/joshuakarjala/d700e2c9259d856a0785b8d9f8d74a5f
*/
var slackEvents = require('slack-events-listener')('v47IxLKpDJwmULUHq7MbNOI6', onSlackEvent);
var bodyParser = require('body-parser');
const app = require('express')();
const port = process.env.PORT || 4205;

function onSlackEvent(event, cb) {
  // do something. call cb with err if you want Slack to resend the message (your database might be down)
  console.log(event);
  // writeToDatabase(event, cb);
}


// /slack_events should match whatever webhook you set in Slack
app.use('/slack_events', bodyParser.json(), slackEvents);

// start server
app.listen(port, function (req, res) {
    console.info(`Started Express server on port ${port}`)
});
