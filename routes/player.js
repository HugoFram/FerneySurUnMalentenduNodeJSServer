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

module.exports = playerRouter;