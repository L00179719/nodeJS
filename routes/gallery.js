var express = require('express');
var router = express.Router();
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');

var con = mysql.createConnection({

    host: "localhost",
    user: "adi",
    password: "Mypass123$",
    dateStrings: 'date',
    database: "project",


});


/* GET gallery page. */
router.get('/', function (req, res, next) {
    con.query("SELECT * FROM gallery", function (err, result) {



        // send variables to ejs page
        res.render('gallery', { imageList: result });
    });
});

module.exports = router;