var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {

    //store seession variable to usernames page
    var username = req.session.username;
    const message = req.flash('message')

    //validate the user account for session

    if (req.session) {



        if (req.session.validated == true && username == 'admin') {


            res.render('newsletter', { username: username, message });



        } else {
            res.redirect('/login');
        }

    }



});

module.exports = router;