var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//database connection
var con = mysql.createConnection({

    host: "localhost",
    user: "adi",
    password: "Mypass123$",
    dateStrings: 'date',
    database: "project",
    timezone: 'utc'


});

/* GET payment page. */
router.get('/', function (req, res, next) {
    var Publishable_Key = 'pk_test_51KriHjBrbNjrgLjxH78DEVrFScHXO1oF8A0H5uHSF2pFz2mKLLD4DJZgvC2wRV5WeMjPtAGsdZUT4CswzSB9lHcI00xHb5EiZg'


    //get variables stored in sessions
    var username = req.session.username;
    var arrival = req.session.arrival;
    var stays = req.session.stays;
    var adults = req.session.adults;
    var children = req.session.children;
    var room = req.session.room;
    var price = req.session.price;
    var newPrice = price * 100;
    var email = req.session.email;
    var fullname = req.session.fullname;

    //get flass message fom app.js and send to ejs payment page
    const message = req.flash('message')


    con.query("SELECT * FROM bookings where username =?", [username], function (err, result) {


        if (req.session) {



            //check if user logged in, not admin and price session exist
            if (req.session.validated == true && username != 'admin') {

                // rending the view and send variables to ejs page! 
                res.render('payment', { title: 'Express', bookingList: result, key: Publishable_Key, username: username, arrival: arrival, stays: stays, adults: adults, children: children, room: room, newPrice: newPrice, price: price, message, email: email, fullname: fullname });

            } else {
                res.redirect('/login');
            }

        }




    })



});

module.exports = router;