var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var mysql = require('mysql');
const { parse } = require('json-parser')

var con = mysql.createConnection({

    host: "database-1.cluster-cc0bmnspwen6.eu-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Mach112255",
    dateStrings: 'date',
    database: "mydb",


});

/* GET register page. */
router.get('/', function (req, res, next) {

    //messages from app.js /register
    const alert = req.flash('message')
    //const captchaMessage = req.flash('captcha')



    // rending the view and send variables to ejs page! 
    res.render('register', { title: 'Express', alert });





});



module.exports = router;