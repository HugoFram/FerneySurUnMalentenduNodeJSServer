const express = require('express');
const cors = require('cors');

const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3443', 'http://localhost:4200', 'http://217.162.196.67', 'http://192.168.0.157'];

var corsOptionDelegate = (req, callback) => {
    var corsOption;

    console.log("Request originating from " + req.header('Origin'));
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    } else {
        corsOptions = { origin: false };
    }

    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionDelegate);