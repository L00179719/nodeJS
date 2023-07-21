var express = require('express');
var router = express.Router();



/* GET login page. */
router.get('/', function (req, res, next) {

    //record flash messages from app.js and send them to client side
    const alertSuccess = req.flash('message')
    const alertPassword = req.flash('invalid')
    const alertBook = req.flash('login')


    // rending the view and send variables 
    res.render('login', { title: 'Express', alertSuccess, alertPassword, alertBook });

});

module.exports = router;