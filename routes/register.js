var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var mysql = require('mysql');
const { parse } = require('json-parser')

var con = mysql.createConnection({

    host: "rdsdb.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "machiaveli",
    password: "Machiaveli123",
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