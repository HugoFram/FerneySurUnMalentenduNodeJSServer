var config = require('./config');
const { Pool, Client } = require('pg')

const client = new Client({
    user: config.user,
    host: config.host,
    database: config.dbname,
    password: config.password,
    port: config.dbport,
  });
  client.connect()
    .then((db) => console.log("Connected correctly to the database"))
    .catch((err) => console.log(err));

module.exports = client;