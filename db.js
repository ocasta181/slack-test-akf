const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

module.exports = {
	query: (text, params, callback) => {
		return client.query(text, params, callback)
	}
};