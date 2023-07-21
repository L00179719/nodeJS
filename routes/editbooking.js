var express = require('express');
var router = express.Router();



/* GET editbooking page. */
router.get('/', function (req, res, next) {



    var username = req.session.username;

    if (req.session) {


        //if user logged in and user = admin render page 

        if (req.session.validated == true && username == 'admin') {

            // rending the view! 
            res.render('editbooking', { title: 'Express', bookinglist: {} });


        } else {

            //if not -> redirect to login
            res.redirect('/login');
        }

    }
});




module.exports = router;