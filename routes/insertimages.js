var express = require('express');
var router = express.Router();
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');

var con = mysql.createConnection({

    host: "localhost",
    user: "adi",
    password: "Mypass123$",
    dateStrings: 'date',
    database: "project",
    timezone: 'utc'


});



/* GET insertimages page. */
router.get('/', function (req, res, next) {

    var username = req.session.username;

    //messages from app.js /insertimages
    const alert = req.flash('message')
    const success = req.flash('uploadMessage')
    const deleteImage = req.flash('deleteMessage')


    if (req.session) {



        if (req.session.validated == true && username == 'admin') {

            con.query("SELECT * FROM gallery", function (err, result) {



                // send variables to ejs page
                res.render('insertimages', { imageList: result, username: username, alert, success, deleteImage });
            });

        } else {
            res.redirect('/login');
        }

    }



});



module.exports = router;