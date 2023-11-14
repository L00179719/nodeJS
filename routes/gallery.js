var express = require('express');
var router = express.Router();
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');

var con = mysql.createConnection({

    host: "hiit.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "l00179719",
    password: "Machiaveli123",
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