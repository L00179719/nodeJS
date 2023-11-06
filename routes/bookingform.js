var express = require('express');
var router = express.Router();
var mysql = require('mysql');


//database connection
var con = mysql.createConnection({

    host: "rdsdb.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "machiaveli",
    password: "Machiaveli123",
    dateStrings: 'date',
    database: "mydb",


});


/* GET bookingform page. */
router.get('/', function (req, res, next) {

    const alert = req.flash('message')


    //select from bookings room types for displaying on booking.ejs page

    con.query("SELECT * FROM rooms", function (err, result) {

        con.query("SELECT price,qty from rooms where type = 'Standard Double'", function (err, standard) {

            con.query("SELECT price,qty from rooms where type = 'Premium Double'", function (err, premium) {

                con.query("SELECT price,qty from rooms where type = 'Suite'", function (err, suite) {

                    //grab values that were stored in sessions
                    var username = req.session.username;
                    var arrival = req.session.arrival;
                    var stays = req.session.stays;
                    var adults = req.session.adults;
                    var children = req.session.children;
                    var room = req.session.room;
                    var price = req.session.price;

                    //for loop to get rows from table for standard room
                    standard.forEach(item => {
                        qtyStandard = item.qty;
                        priceStandard = item.price;
                        totalPriceStandard = priceStandard * stays;

                        console.log(totalPriceStandard);


                    });
                    premium.forEach(item => {
                        qtyPremium = item.qty;
                        pricePremium = item.price;
                        totalPricePremium = pricePremium * stays;

                    });
                    suite.forEach(item => {
                        qtySuite = item.qty;
                        priceSuite = item.price;
                        totalPriceSuite = priceSuite * stays;
                    });



                    //if not logged in redirect to login page
                    if (req.session) {



                        if (req.session.validated == true && adults > 0) {

                            // send variables to bookingform.ejs
                            res.render('bookingform', { imageList: result, priceStandard: priceStandard, pricePremium: pricePremium, priceSuite: priceSuite, totalPriceStandard: totalPriceStandard, totalPricePremium: totalPricePremium, totalPriceSuite: totalPriceSuite, username: username, arrival: arrival, stays: stays, adults: adults, children: children, room: room, price: price, qtyStandard: qtyStandard, qtyPremium: qtyPremium, qtySuite: qtySuite, alert });

                        } else {

                            //if not logged in redirect to login page
                            res.redirect('/login');
                        }

                    }

                });

            });

        });


    });

});

//



module.exports = router;




