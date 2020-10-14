const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const playerRouter = express.Router();
const cors = require('./cors');

playerRouter.use(bodyParser.json());

/* GET users listing. */
playerRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM player")
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

playerRouter.route('/:playerName')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM player WHERE \"firstname\" = $1", [ req.params.playerName ])
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows[0]);
            })
            .catch(err => console.error(err.stack))
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        console.log(req.body);
        var query = "DELETE FROM player WHERE firstname = '" + req.params.playerName + "'; INSERT INTO player(firstname, lastname, role, email) VALUES";
        query = query + "('" + req.body.firstname + "', '" + req.body.lastname + "', '" + req.body.role + "', '" + req.body.email + "');";
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
        client.query("DELETE FROM player WHERE firstname = $1", [ req.params.playerName ])
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                console.log(result);
                res.json(result);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = playerRouter;
