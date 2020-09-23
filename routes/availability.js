const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const availabilityRouter = express.Router();
const cors = require('./cors');

availabilityRouter.use(bodyParser.json());

/* GET users listing. */
availabilityRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT * FROM availability")
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

availabilityRouter.route('/:matchNum/:playerName')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .post(cors.corsWithOptions, (req, res, next) => {
        console.log(req.body);
        var query = "DELETE FROM availability WHERE \"matchNum\" = '" + req.params.matchNum + "' AND name = '" + req.params.playerName + "';";
        query += "INSERT INTO availability(name, availability, role, \"trainingPresence\", \"matchPresence\", \"selected\", \"matchNum\") VALUES ('";
        query += req.body.name + "', '" + 
                 req.body.availability + "', '" + 
                 req.body.role + "', '" + 
                 req.body.trainingPresence + "', '" + 
                 req.body.matchPresence + "', '" + 
                 req.body.selected + "', '" + 
                 req.body.matchNum + "');";
        console.log(query);
        client.query(query)
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                console.log(result);
                res.json(result);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = availabilityRouter;
