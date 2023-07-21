var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {

    var username = req.session.username;
    var message = req.flash('message');


    // rending the view! 
    res.render('index', { title: 'Express', username: username, message });

});

module.exports = router;