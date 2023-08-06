var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var mysql = require('mysql');
const { parse } = require('json-parser')

var con = mysql.createConnection({

    host: "localhost",
    user: "adi",
    password: "Mypass123$",
    dateStrings: 'date',
    database: "project",
    timezone: 'utc'


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