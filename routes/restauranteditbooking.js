var express = require('express');
var router = express.Router();



/* GET restauranteditbooking page. */
router.get('/', function (req, res, next) {



    var username = req.session.username;

    if (req.session) {



        if (req.session.validated == true && username == 'admin') {

            // rending the view! 
            res.render('restauranteditbooking', { title: 'Express', resbookinglist: {}, username: username });

        } else {
            res.redirect('/login');
        }

    }
});





module.exports = router;