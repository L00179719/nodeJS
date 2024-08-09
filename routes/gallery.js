var express = require('express');
var router = express.Router();
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');

var con = mysql.createConnection({

    host: "database-1.cluster-cc0bmnspwen6.eu-west-1.rds.amazonaws.com",
    user: "admin",
    password: "Mach112255",
    dateStrings: 'date',
    database: "mydb",


});


/* GET gallery page. */
router.get('/', function (req, res, next) {
    con.query("SELECT * FROM gallery", function (err, result) {



        // send variables to ejs page
        res.render('gallery', { imageList: result });
    });
});

module.exports = router;