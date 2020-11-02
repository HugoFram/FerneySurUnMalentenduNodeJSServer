const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const client = require('../dbconnect')
const sheetRouter = express.Router();
const cors = require('./cors');
const config = require('../config');

sheetRouter.use(bodyParser.json());

/* GET users listing. */
sheetRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        let matchNums = fs.readdirSync(config.sheetspath).map(file => file.replace(".pdf", ""));
        res.statusCode = 200;
        res.setHeader('Content-Type', "application/json");
        res.json(matchNums);
    });

sheetRouter.route('/:matchId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .get(cors.cors, (req, res, next) => {
        res.sendFile(config.sheetspath + req.params.matchId + ".pdf");
    });

module.exports = sheetRouter;