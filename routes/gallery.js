var express = require('express');
var router = express.Router();
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');

var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "project",
    timezone: 'utc'


});


/* GET gallery page. */
router.get('/', function (req, res, next) {
    con.query("SELECT * FROM gallery", function (err, result) {



        // send variables to ejs page
        res.render('gallery', { imageList: result });
    });
});

module.exports = router;