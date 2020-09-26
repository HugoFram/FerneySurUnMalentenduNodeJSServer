const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const pastAvailabilityRouter = express.Router();
const cors = require('./cors');

pastAvailabilityRouter.use(bodyParser.json());

/* GET users listing. */
pastAvailabilityRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM past_availability")
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

pastAvailabilityRouter.route('/:playerName')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM past_availability WHERE name = $1", [ req.params.playerName ])
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows[0]);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = pastAvailabilityRouter;
