var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({

    host: "rdsdb.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "machiaveli",
    password: "Machiaveli123",
    dateStrings: 'date',
    database: "mydb",


});


/* GET  page. */
router.get('/', function (req, res, next) {


    //select from restaurant booking table for displaying on restaurantbookings.ejs page
    con.query("SELECT * FROM bookrestaurant", function (err, result) {


        var username = req.session.username;

        if (req.session) {



            if (req.session.validated == true && username == 'admin') {

                // if any error while executing above query, throw error
                res.render('restaurantbookings', { resbookinglist: result, username: username, });

            } else {
                res.redirect('/login');
            }

        }
    });


});

//



module.exports = router;