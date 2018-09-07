const { Client } = require('pg');
const client = new Client({
	host: 'ec2-107-21-126-193.compute-1.amazonaws.com',
	port: 5432,
	user: 'nwadcggomkyclo',
	password: '5f90763c50039296ef6607196661dd13a8402997126e3c0706689687bcafca10',
});

client.connect((err) => {
	if (err) {
		console.error('connection error', err.stack)
	} else {
		console.log('connected')
	}
})

module.exports = {
	query: (text, params, callback) => {
		return client.query(text, params, callback)
	}
};