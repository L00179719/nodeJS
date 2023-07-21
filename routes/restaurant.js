var express = require('express');
var router = express.Router();



/* GET restaurant page. */
router.get('/', function (req, res, next) {


    const message = req.flash('message')

    // rending the view! 
    res.render('restaurant', { title: 'Express', message });

});

module.exports = router;