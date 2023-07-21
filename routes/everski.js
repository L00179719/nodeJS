var express = require('express');
var router = express.Router();



/* GET everski page. */
router.get('/', function (req, res, next) {



    // rending the view! 
    res.render('everski', { title: 'Express' });

});

module.exports = router;