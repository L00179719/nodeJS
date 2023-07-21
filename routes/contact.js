var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function (req, res, next) {

    const message = req.flash('message')




    // rending the view! 
    res.render('contact', { title: 'Express', message });

});

module.exports = router;