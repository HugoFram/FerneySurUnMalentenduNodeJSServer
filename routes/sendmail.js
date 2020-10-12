const express = require('express');
const bodyParser = require('body-parser');
const sendmailRouter = express.Router();
const cors = require('./cors');
const nodemailer = require("nodemailer");
var config = require('../config');

sendmailRouter.use(bodyParser.json());

const transport  = nodemailer.createTransport({
    host: config.mailserver,
    port: config.mailport,
    secure: true,
    auth: {
        user: config.mailuser,
        pass: config.mailpassword
    }
}); 

/* GET users listing. */
sendmailRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus = 200; })
    .post(cors.corsWithOptions, (req, res) => {
        console.log(req.body);
        let mailOptions = {
            from: config.mailsender,
            to: req.body.recipient,
            subject: req.body.subject,
            //text: req.params.contentText,
            html: req.body.content
            //attachments: [
            //  {
            //    filename: 'mailtrap.png',
            //    path: __dirname + '/mailtrap.png',
            //    cid: 'uniq-mailtrap.png' 
            //  }
            //]
        };

        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            res.json(info);
        });
    });

module.exports = sendmailRouter;