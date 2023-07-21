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



/* GET home page. */
router.get('/', function (req, res, next) {


    //select from bookings for displaying on bookings.ejs page
    con.query("SELECT * FROM bookings order by arrival desc", function (err, result) {

        var username = req.session.username;



        if (req.session) {



            //check login validation
            if (req.session.validated == true && username == 'admin') {

                // send variables to ejs bookings page
                res.render('bookings', { bookingList: result, username: username });

            } else {

                //if not logged in redirect to login page
                res.redirect('/login');
            }

        }


    });

});

//



module.exports = router;