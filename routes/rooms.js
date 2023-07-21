var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//database connection
var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "project",
    dateStrings: 'date',
    timezone: 'utc'


});

/* GET ROOMS page. */
router.get('/', function (req, res, next) {

    //select from rooms for displaying on rooms.ejs page

    con.query("SELECT * FROM rooms", function (err, result) {



        //render the view with variables
        res.render('rooms', { imageList: result });




    })



});

module.exports = router;