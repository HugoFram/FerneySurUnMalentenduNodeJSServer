const express = require('express');
const bodyParser = require('body-parser');
const client = require('../dbconnect')
const rankingRouter = express.Router();
const cors = require('./cors');

rankingRouter.use(bodyParser.json());

/* GET users listing. */
rankingRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        client.query('SELECT CAST(rank AS integer), team, CAST(score AS integer), \
        (CAST(coalesce("vPlus", \'0\') AS integer) + CAST(coalesce("vMinus", \'0\') AS integer)) as wins, (CAST(coalesce("dPlus", \'0\') AS integer) + CAST(coalesce("dMinus", \'0\') AS integer)) as losses, \
                    CAST(substring(sets from \'^[0-9]+\') AS integer) as "setsWon", CAST(substring(sets from \'[0-9]+$\') AS integer) as "setsLost", \
                    CAST(substring(points from \'^[0-9]+\') AS integer) as "pointsWon", CAST(substring(points from \'[0-9]+$\') AS integer) as "pointsLost", CAST(matchs AS integer) as "numMatches" FROM ranking')
            .then(result => {
                res.statusCode = 200;
                res.setHeader('Content-Type', "application/json");
                res.json(result.rows);
            })
            .catch(err => console.error(err.stack))
    });

module.exports = rankingRouter;
