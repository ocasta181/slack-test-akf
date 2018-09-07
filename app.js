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
const app = require('express')();
const port = process.env.PORT || 4205;
const slackEvents = require('slack-events-listener')('v47IxLKpDJwmULUHq7MbNOI6', onSlackEvent);
const bodyParser = require('body-parser');
// const db = require('./db.js');
const db = require('./db.js');


function onSlackEvent(event, cb) {
	// do something. call cb with err if you want Slack to resend the message (your database might be down)
	console.log(event);
	var event_type = event.event.type;
	var username = event.event.user;
	var channel = event.event.channel;
	var timestamp = event.event.ts;
	var channel_type = event.event.channel_type;
	db.query('INSERT INTO message (event_type, username, channel, timestamp, channel_type) VALUES ($1, $2, $3, $4, $5) RETURNING id', 
		[event_type, username, channel, timestamp, channel_type], 
		(err, res) => {
			if (err) {
				console.error('insert error: ', err.stack);
			}
			else if (res) {
				console.log(res);
			}
	});
}


// /slack_events should match whatever webhook you set in Slack
app.use('/slack_events', bodyParser.json(), slackEvents);

// start server
app.listen(port, function (req, res) {
		console.info(`Started Express server on port ${port}`)
});
