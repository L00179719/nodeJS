var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({

    host: "hiit.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "l00179719",
    password: "Machiaveli123",
    dateStrings: 'date',
    database: "mydb",


});



/* GET  page. */
router.get('/', function (req, res, next) {


    const alert = req.flash('message')
    const success = req.flash('uploadMessage')


    //select from bookings for displaying on booking.ejs page


    var username = req.session.username;




    if (req.session) {




        if (req.session.validated == true && username == 'admin') {

            con.query("SELECT * FROM rooms", function (err, result) {



                // send variables to ejs page
                res.render('createrooms', { imageList: result, username: username, alert, success });
            });

        } else {

            //if not logged in redirect to login page
            res.redirect('/login');
        }

    }



});

//



module.exports = router;