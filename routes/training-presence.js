const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const trainingPresenceRouter = express.Router();
const cors = require('./cors');

trainingPresenceRouter.use(bodyParser.json());

/* GET users listing. */
trainingPresenceRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query("SELECT name, date, presence FROM training JOIN player ON training.name = player.firstname ORDER BY date, name")
            .then(result => {
                let response = {
                    trainings: [],
                    players: []
                }
                result.rows.forEach(row => {
                    let playerId = response.players.indexOf(row.name);
                    let trainingId = response.trainings.findIndex((training) => training.date == row.date);
                    if (playerId == -1) {
                        response.players.push(row.name);
                        playerId = response.players.length - 1;
                    }
                    if (trainingId == -1) {
                        response.trainings.push({
                            date: row.date,
                            label: '',
                            presences: {}
                        });
                        trainingId = response.trainings.length - 1
                    }
                    response.trainings[trainingId].presences[row.name] = {
                        name: row.name,
                        presenceType: row.presence
                    };
                })
                // Compute row label
                response.trainings.forEach(training => {
                    let numPresent = Object.entries(training.presences).filter(presence => presence[1].presenceType === 'Présent').length;
                    training.label = new Date(training.date).toLocaleDateString("fr-FR") + " (" + numPresent + ")";
                })

                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(response);
            })
            .catch(err => console.error(err.stack))
    })

trainingPresenceRouter.route('/:trainingDate')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .post(cors.corsWithOptions, (req, res, next) => {
        console.log(req.body);
        var query = "DELETE FROM training WHERE date = '" + req.params.trainingDate + "'; INSERT INTO training(name, date, presence) VALUES";
        req.body.forEach((presence, i) => {
            query = query + "('" + presence.name + "', '" + presence.date + "', '" + presence.presence + "')" + ((i == req.body.length - 1) ? "" : ",");
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
        client.query("DELETE FROM training WHERE date = $1", [ req.params.trainingDate ])
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                console.log(result);
                res.json(result);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = trainingPresenceRouter;
