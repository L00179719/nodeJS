var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//database connection
var con = mysql.createConnection({

    host: "hiit.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "l00179719",
    password: "Machiaveli123",
    dateStrings: 'date',
    database: "mydb",


});


/* GET customer page. */
router.get('/', function (req, res, next) {

    //get username session stored when logged in
    var username = req.session.username;
    var fullname = req.session.fullname;
    const message = req.flash('message');

    //select from bookings for displaying on customer.ejs page
    con.query("SELECT * FROM bookings where username =?", [username], function (err, result) {



        //validate the user account for session

        if (req.session) {



            if (req.session.validated == true && username != 'admin') {




                //send variables to customer.ejs page
                res.render('customer', { bookingList: result, username: username, message, fullname: fullname });




            } else {
                //redirect if not logged in and user not admin
                res.redirect('/login');
            }

        }





    });

});

module.exports = router;