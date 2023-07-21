var express = require('express');
var router = express.Router();

/* GET logoutpage page */
router.get('/', function (req, res, next) {


    //pass session variable to logout ejs page
    var username = req.session.username;


    res.render('logoutpage', { title: 'Express', username: username });
});

module.exports = router;
