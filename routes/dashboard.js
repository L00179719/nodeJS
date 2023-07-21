var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//database connection
var con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    dateStrings: 'date',
    database: "project",


});

/* GET dashboard page. */
router.get('/', function (req, res, next) {

    //SELECT QUERIES TO SEND ON DASHBOARD EJS FILE

    con.query("SELECT SUM(price) AS total FROM bookings where arrival BETWEEN '2022/01/01' AND CURDATE()", function (err, revenue) {

        con.query("SELECT count(id) AS totalReservations FROM bookings where arrival BETWEEN '2022/01/01' AND CURDATE()", function (err, reservations) {

            con.query("SELECT count(id) AS totalTables FROM bookrestaurant where bookingdate BETWEEN '2022/01/01' AND CURDATE()", function (err, tables) {

                con.query("SELECT SUM(price) AS totalStandard FROM bookings where arrival BETWEEN '2022/01/01' AND CURDATE() and room like 'Standard Double'", function (err, standardRoom) {

                    con.query("SELECT SUM(price) AS totalPremium FROM bookings where arrival BETWEEN '2022/01/01' AND CURDATE() and room like 'Premium Double'", function (err, premiumRoom) {

                        con.query("SELECT SUM(price) AS totalSuite FROM bookings where arrival BETWEEN '2022/01/01' AND CURDATE() and room like 'Suite'", function (err, suiteRoom) {

                            con.query("SELECT SUM(price) as totalJanuary FROM bookings WHERE arrival BETWEEN '2022-01-01' AND '2022-01-31'", function (err, january) {

                                con.query("SELECT SUM(price) as totalFebruary FROM bookings WHERE arrival BETWEEN '2022-02-01' AND '2022-02-28'", function (err, february) {

                                    con.query("SELECT SUM(price) as totalMarch FROM bookings WHERE arrival BETWEEN '2022-03-01' AND '2022-03-31'", function (err, march) {

                                        con.query("SELECT SUM(price) as totalApril FROM bookings WHERE arrival BETWEEN '2022-04-01' AND '2022-04-30'", function (err, april) {

                                            con.query("SELECT SUM(price) as totalMay FROM bookings WHERE arrival BETWEEN '2022-05-01' AND '2022-05-31'", function (err, may) {

                                                con.query("SELECT SUM(price) as totalJune FROM bookings WHERE arrival BETWEEN '2022-06-01' AND '2022-06-30'", function (err, june) {


                                                    con.query("SELECT SUM(price) as totalJuly FROM bookings WHERE arrival BETWEEN '2022-07-01' AND '2022-07-31'", function (err, july) {


                                                        con.query("SELECT SUM(price) as totalAugust FROM bookings WHERE arrival BETWEEN '2022-08-01' AND '2022-08-31'", function (err, august) {


                                                            con.query("SELECT SUM(price) as totalSeptember FROM bookings WHERE arrival BETWEEN '2022-09-01' AND '2022-09-30'", function (err, september) {


                                                                con.query("SELECT SUM(price) as totalOctober FROM bookings WHERE arrival BETWEEN '2022-10-01' AND '2022-10-31'", function (err, october) {



                                                                    con.query("SELECT SUM(price) as totalNovember FROM bookings WHERE arrival BETWEEN '2022-11-01' AND '2022-11-30'", function (err, november) {


                                                                        con.query("SELECT SUM(price) as totalDecember FROM bookings WHERE arrival BETWEEN '2022-12-01' AND '2022-12-31'", function (err, december) {

                                                                            con.query("SELECT SUM(price) AS totalLastYear FROM bookings where arrival BETWEEN '2021/01/01' AND DATE_SUB(CURDATE(), interval 1 YEAR)", function (err, lastYear) {

                                                                                //store seession variable to dashboard page
                                                                                var username = req.session.username;


                                                                                //validate the user account for session

                                                                                if (req.session) {



                                                                                    if (req.session.validated == true && username == 'admin') {

                                                                                        //render ejs page and pass the variables
                                                                                        res.render('dashboard', { username: username, totalRevenue: revenue, totalReservations: reservations, totalTables: tables, totalStandard: standardRoom, totalPremium: premiumRoom, totalSuite: suiteRoom, totalJanuary: january, totalFebruary: february, totalMarch: march, totalApril: april, totalMay: may, totalJune: june, totalJuly: july, totalAugust: august, totalSeptember: september, totalOctober: october, totalNovember: november, totalDecember: december, lastYearRevenue: lastYear });



                                                                                    } else {
                                                                                        //REDIRECT IF NOT LOGGED IN AND USER NOT ADMIN
                                                                                        res.redirect('/login');
                                                                                    }

                                                                                }

                                                                            })




                                                                        });
                                                                    });


                                                                });


                                                            });

                                                        });

                                                    });
                                                });
                                            });

                                        });


                                    });


                                });



                            });


                        });


                    });

                });

            });
        });

    });


})
module.exports = router;