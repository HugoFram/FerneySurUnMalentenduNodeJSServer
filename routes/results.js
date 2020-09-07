const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const resultsRouter = express.Router();
const cors = require('./cors');

resultsRouter.use(bodyParser.json());

/* GET users listing. */
resultsRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM results")
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = resultsRouter;
