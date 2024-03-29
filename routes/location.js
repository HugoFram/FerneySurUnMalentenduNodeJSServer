const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const locationRouter = express.Router();
const cors = require('./cors');

locationRouter.use(bodyParser.json());

/* GET users listing. */
locationRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT adress as address, longitude, latitude FROM location")
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = locationRouter;
