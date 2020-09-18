const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const matchPresenceRouter = express.Router();
const cors = require('./cors');

matchPresenceRouter.use(bodyParser.json());

/* GET users listing. */
matchPresenceRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM match")
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

matchPresenceRouter.route('/:matchDate')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .post(cors.corsWithOptions, (req, res, next) => {
        console.log(req.body);
        var query = "DELETE FROM match WHERE date = '" + req.params.matchDate + "'; INSERT INTO match(name, date, presence, adversary, \"setsWon\", \"setsLost\") VALUES";
        req.body.forEach((presence, i) => {
            query = query + "('" + 
                presence.name + "', '" + 
                presence.date + "', '" + 
                presence.presence + "', '" + 
                presence.adversary + "', '" + 
                presence.setsWon + "', '" + 
                presence.setsLost + "')" + ((i == req.body.length - 1) ? "" : ",");
        });
        console.log(query);
        client.query(query)
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                console.log(result);
                res.json(result);
            })
            .catch(err => console.error(err.stack))
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        client.query("DELETE FROM match WHERE date = $1", [ req.params.matchDate ])
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                console.log(result);
                res.json(result);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = matchPresenceRouter;
