var express = require('express');
var router = express.Router();



/* GET book page. */
router.get('/', function (req, res, next) {


    var username = req.session.username;



    //if not logged in redirect to login page
    if (req.session) {



        if (req.session.validated == true && username != 'admin' && username != 'Admin') {

            // if any error while executing above query, throw error
            res.render('book', { username: username });

        } else {

            req.flash('login', 'Login or register to book room')



            res.redirect('/login');
        }

    }


});

module.exports = router;