const mysql = require("mysql");
const express = require("express");
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session')
const req = require('express/lib/request');
const date = require('date-and-time');
var bcrypt = require('bcrypt');
const flash = require('connect-flash');
const request = require('request');
const nodemailer = require("nodemailer");
const multer = require('multer')





//stripe keys
var Publishable_Key = 'pk_test_51KriHjBrbNjrgLjxH78DEVrFScHXO1oF8A0H5uHSF2pFz2mKLLD4DJZgvC2wRV5WeMjPtAGsdZUT4CswzSB9lHcI00xHb5EiZg'
var Secret_Key = 'sk_test_51KriHjBrbNjrgLjxIYbwxo1dcaPvHJw8AKA42qgQ64bLWkS2E1RxUCJTOFILDrJqaQOFcDz3YlFgC3Q5MV7gWBLl00Gy9HgdYk'

const stripe = require('stripe')(Secret_Key)






//create routes

var indexRouter = require('./routes/index');

var contactRouter = require('./routes/contact');
var bookRouter = require('./routes/book');
var dashboardRouter = require('./routes/dashboard');
var everskiRouter = require('./routes/everski');
var galleryRouter = require('./routes/gallery');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var restaurantRouter = require('./routes/restaurant');
var roomsRouter = require('./routes/rooms');
var bookingformRouter = require('./routes/bookingform');
var bookingsRouter = require('./routes/bookings');
var insertimagesRouter = require('./routes/insertimages');
var newbookingRouter = require('./routes/newbooking');
var restaurantBookingsRouter = require('./routes/restaurantbookings');
var customerRouter = require('./routes/customer');
var restaurantnewbookingRouter = require('./routes/restaurantnewbooking');
var contactMessagesRouter = require('./routes/contactmessages');
var logoutpageRouter = require('./routes/logoutpage');
var editbookingRouter = require('./routes/editbooking');
var createroomsRouter = require('./routes/createrooms');
var newsletterRouter = require('./routes/newsletter');
var restauranteditbookingRouter = require('./routes/restauranteditbooking');
var paymentRouter = require('./routes/payment');


var router = express.Router();
const { Console } = require("console");
const { param } = require("express/lib/request");
const { type } = require("os");


var app = express();

//express session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

//flash messages
app.use(flash());


app.set('trust proxy', 1) // trust first proxy

//set engine type and views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//parse JSON data
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('SecretStringForCookies'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.listen(3000);


//use routers
app.use('/', loginRouter);
app.use('/contact', contactRouter);
app.use('/book', bookRouter);
app.use('/dashboard', dashboardRouter);
app.use('/everski', everskiRouter);
app.use('/gallery', galleryRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/restaurant', restaurantRouter);
app.use('/rooms', roomsRouter);
app.use('/bookingform', bookingformRouter);
app.use('/bookings', bookingsRouter);
app.use('/insertimages', insertimagesRouter);
app.use('/newbooking', newbookingRouter);
app.use('/restaurantbookings', restaurantBookingsRouter);
app.use('/customer', customerRouter);
app.use('/restaurantnewbooking', restaurantnewbookingRouter);
app.use('/contactmessages', contactMessagesRouter);
app.use('/logoutpage', logoutpageRouter);
app.use('/editbooking', editbookingRouter);
app.use('/createrooms', createroomsRouter);
app.use('/newsletter', newsletterRouter);
app.use('/restauranteditbooking', restauranteditbookingRouter);
app.use('/payment', paymentRouter);









//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------DATABASE CONNECTION----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//


//database connection
var con = mysql.createConnection({

    host: "rdsdb.clytkfjoovlo.us-east-1.rds.amazonaws.com",
    user: "l00179719",
    password: "Machiaveli123",
    dateStrings: 'date',
    database: "mydb",


});






//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------EMAIL NEWSLETTER INPUT and SENT NEWSLETTERS----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//




//GET EMAILS
app.post('/email', function (req, res) {

    //grab variables sent from client side
    var email = req.body.email;
    console.log(email);





    var sql = "INSERT INTO emails (email) VALUES ('" + email + "' );";

    //query to check if email is valid
    con.query(sql, function (err) {
        if (err) throw err;


        else {


            console.log("Email inserted");

            res.render('index', { message: 'Email added to our newsletter!' });
        }
    })

    console.log(sql);

    //redirect after client insert email
    // res.send('Redirect to homepage');





})

//SEND NEWS
app.post('/sendnewsletter', function (req, res) {



    //select all emails from table
    var sql = 'select email from emails;';


    //querry for loop to get all emails as strings
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        array = result;
        array.forEach(element => {
            emails = element.email;
            console.log(emails);
        });



        //set email output that will be sent

        const output = `
    <p>You have a new offer from Ski Resort</p>
    <h3>Details</h3>
    <ul>
    <li>Title: ${req.body.title}</li>
    <li>Subject: ${req.body.subject}</li>
    <li>Message: ${req.body.news}</li><br>
    
    </ul>
    
    
    
    `;   //CODE USED FROM NODEMAILER AT : https://nodemailer.com/about/

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            //businness's mail domain and ssh port
            host: 'mail.clearskydestinations.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                //businness's username and pass
                user: 'contact@clearskydestinations.com', // generated ethereal user
                pass: 'Machiaveli2$'  // generated ethereal password
            },
            tls: {
                //add this if testing in localhost
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Ski Resort" <contact@clearskydestinations.com>', // sender address
            //send to variable emails that contains all emails from database
            to: emails, // list of receivers
            subject: 'Ski Resort Offer', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            //USE FLASH MESSAGE
            req.flash('message', 'Newsletter sent successfuly!')
            res.redirect('/newsletter');
        });//enD for function

    });

})




//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------REGISTER USERNAMES----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//


app.post('/register', function (req, res, next) {





    //grab values sent from client side form action=/register
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.confirmpassword;

    if (cpassword == password) {


        var sql = 'select * from login where username = ?;';

        con.query(sql, [username], function (err, result, fields) {
            if (err) throw err;

            //if username found in database
            if (result.length > 0) {
                req.flash('message', 'Username  ' + username + ' already exist')
                res.redirect('/register');



            } else {

                //using bcrypt to encrypt password
                var hashpassword = bcrypt.hashSync(password, 10);
                var sql = 'insert into login(username,email, userpassword) values(?,?,?);';

                con.query(sql, [username, email, hashpassword], function (err, result, fields) {
                    if (err) throw err;

                    req.flash('message', 'Username ' + username + ' registered successfully')

                    res.redirect('/login');
                });
            }
        });

        //if password won't match
    } else {
        req.flash('message', 'Confirm Password does not match')
        res.redirect('/register');
    }
}
);


//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------LOGIN----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//


app.post('/login', function (req, res, next) {

    //grab values sent from client side form action=/login
    var username = req.body.username;
    var password = req.body.password;




    var sql = 'select * from login where username = ?;';

    con.query(sql, [username], function (err, result, fields) {
        if (err) throw err;




        //validation compare between user's password and hashed password
        if (result.length && bcrypt.compareSync(password, result[0].userpassword)) {




            req.session.username = username;
            req.session.validated = true;
            var stays = req.session.stays;

            ///if username = admin -> redirect to dashboard
            if (username == 'admin') {
                res.redirect('/dashboard');

            }
            ///if username not admin -> redirect to customer profile page 
            if (username != 'admin') {
                req.flash('message', 'Login succesfully')
                res.redirect('/customer');

            }

        } else {

            req.flash('invalid', 'Invalid username or password')

            res.redirect('/login');


        }
    });
});

//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------LOGOUT----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

app.get('/logout', function (req, res) {


    //destroy session created when user logged in
    req.session.destroy(function (err) {


    })
    res.redirect('logoutpage');

});



//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------BOOKING PAGE----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

app.post('/book', function (req, res) {


    //grab variables sent from  client side
    var arrival = req.body.arrival;
    var stays = req.body.stays;
    var adults = req.body.adults;
    var children = req.body.children;

    //record session to be used on final booking form
    req.session.arrival = arrival;
    req.session.adults = adults;
    req.session.stays = stays;
    req.session.children = children;

    res.redirect('/bookingform');



})


//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------FINAL BOOKING FORM----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//





app.post('/bookingform', function (req, res) {


    //grab variables sent from client side

    var room = req.body.selectroom;
    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;





    var arrival = req.session.arrival;
    var stays = req.session.stays;
    var adults = req.session.adults;
    var children = req.session.children;
    var username = req.session.username;

    console.log(qtyStandard);
    console.log(qtyPremium);
    console.log(qtyPremium);



    req.session.room = room;

    req.session.fullname = fullname;
    req.session.email = email;

    //calculate room total depending on room type
    if (room === "Standard Double") {
        var price = totalPriceStandard;

    } else if (room === "Premium Double") {
        var price = totalPricePremium;
    } else if (room === "Suite") {
        var price = totalPriceSuite
    }

    //final price
    req.session.price = price;


    //check if rooms available
    if (room === "Standard Double" && qtyStandard < 1) {

        req.flash('message', 'Standard Double room not available')
        res.redirect('/bookingform');


    } else if (room === "Premium Double" && qtyPremium < 1) {

        req.flash('message', 'Standard Premium room not available')
        res.redirect('/bookingform');


    } else if (room === "Suite" && qtySuite < 1) {

        req.flash('message', 'Suite not available')
        res.redirect('/bookingform');


    } else {


        //set email output that will be sent as booking confirmation
        var output = `
    <p>Hi  ${req.body.fullname}, this is your booking confirmation from Ski Resort Hotel !</p>
    <h3>Details</h3>
    <ul>
    <li>Name: ${req.body.fullname}</li>
    <li>Room: ${room}</li>
    <li>Arrival: ${arrival}</li>
    <li>Nights: ${stays}</li>
    <li>Total Price: € ${price}</li>
    </ul><br><br>
    <h3> Ski Resort Hotel</h3>
    <p> http://localhost:3000/ </p>
    <p> 0722000111</p>

    
    
    
    `;

        //this code was imported from nodemail documentation at : https://nodemailer.com/about/ and was customised to our needs

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'mail.clearskydestinations.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'contact@clearskydestinations.com', // generated ethereal user
                pass: 'Machiaveli2$'  // generated ethereal password
            },

            //use this code if testing from localhost
            tls: {
                rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Ski Resort Booking" <contact@clearskydestinations.com>', // sender address
            to: email, // list of receivers
            subject: 'Ski Resort Reservation', // Subject line
            text: 'Hello world?', // plain text body
            html: output // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        });



        //insert into bookings table

        var sql = "INSERT INTO bookings (room, arrival, price, stays, adults, children,fullname, email, phone, username ) VALUES ('" + room + "','" + arrival + "', '" + price + "','" + stays + "', '" + adults + "', '" + children + "', '" + fullname + "', '" + email + "', '" + phone + "', '" + username + "');";


        con.query(sql, function (err) {
            if (err) throw err;

            //display in terminal if no error
            console.log("booking inserted");
            res.redirect('/payment');
        })

        console.log(sql);


    }

})




//payments using stripe
app.post('/payment', function (req, res) {

    var fullname = req.session.fullname;
    var price = req.session.price;
    var newPrice = price * 100;

    //get email and card details passed when paid
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: fullname,

    })
        .then((customer) => {
            //this details will be seen on stripe payments
            return stripe.charges.create({
                amount: newPrice,    // Charing Rs 25
                description: 'Ski Resort Booking',
                currency: 'EUR',
                customer: customer.id
            });
        })
        .then((charge) => {
            //send a message to customer page if no error
            req.flash('message', 'Payment added successfuly')
            res.redirect('/customer')
        })

        .catch((err) => {
            res.send(err)    // If some error occurs
        });
})





//DELETE CUSTOMER BOOKING

//DELETE

app.get('/deleteCustomer', function (req, res) {


    con.query('DELETE FROM bookings WHERE id = ? ', req.query.id, function (err, result) {
        res.redirect('/customer');


        if (err) throw err;

        console.log("booking deleted");

    })


})




//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------BOOK TABLE----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

app.post('/restaurant', function (req, res) {

    //grab variables sent from client side

    var name = req.body.name;
    var bookingdate = req.body.bookingdate;
    var bookingtime = req.body.bookingtime;
    var persons = req.body.persons;
    var phone = req.body.phone;


    //insert into restaurant booking tabls
    var sql = "INSERT INTO bookrestaurant (name, bookingdate, bookingtime, persons, phone) VALUES ('" + name + "','" + bookingdate + "', '" + bookingtime + "', '" + persons + "', '" + phone + "');";


    con.query(sql, function (err) {
        if (err) throw err;

        //display in terminal
        console.log("table booking inserted");
    })

    console.log(sql);

    req.flash('message', 'Table successfully booked')
    res.redirect('/restaurant');


})


//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------CONTACT FORM INSERT TO DATABASE----------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

//this code was imported from nodemail documentation at : https://nodemailer.com/about/ and was customised to our needs
app.post('/contact', function (req, res) {

    //grab variables sent from client side
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var message = req.body.message;
    console.log(req.body);

    //set email output that will be sent

    const output = `
    <p>You have a new message from Ski Resort contact page</p>
    <h3>Details</h3>
    <ul>
    <li>Name: ${name}</li>
    <li>Email: ${email}</li>
    <li>Phone: ${phone}</li><br>
    <li>Message: ${message}</li>
    </ul>
           
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'mail.clearskydestinations.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'contact@clearskydestinations.com', // generated ethereal user
            pass: 'Machiaveli2$'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Ski Resort Contact" <contact@clearskydestinations.com>', // sender address
        to: 'adi.wiesell@gmail.com', // list of receivers
        subject: 'Ski Resort Contact', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        req.flash('message', 'Message sent successfuly!')
        res.redirect('/contact');

    });



    //also send all form details to dashboard page

    var sql = "INSERT INTO contact (name, email, phone, message) VALUES ('" + name + "','" + email + "', '" + phone + "', '" + message + "');";


    con.query(sql, function (err) {
        if (err) throw err;

        console.log("contact message sent");
    })

    console.log(sql);




})


//---------------------------------------------------------------------------------------------------------//
//-----------------------------------------GALLERY IMAGES INSERT TO DATABASE-------------------------------//
//---------------------------------------------------------------------------------------------------------//

//****UPLOAD IMAGES****
// Create Storage Engine




//---------------------------------------------------------------------------------------------------------//
//***************DASHBOARD********************DASHBOARD**************DASHBOARD*****************************//
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//----------------------------------ROOM BOOKING INSERT/UPDATE/DELETE--------------------------------------//
//---------------------------------------------------------------------------------------------------------//


//INSERT
app.post('/newbooking', function (req, res) {


    //grab variables sent from client side

    var fullname = req.body.fullname;
    var email = req.body.email;
    var phone = req.body.phone;

    var room = req.body.room;
    var arrival = req.body.arrival;
    var stays = req.body.stays;
    var adults = req.body.adults;
    var children = req.body.children;
    var price = req.body.price;



    //insert into bookings
    var sql = "INSERT INTO bookings (room, arrival, price, stays, adults, children,fullname, email, phone) VALUES ('" + room + "','" + arrival + "', '" + price + "','" + stays + "', '" + adults + "', '" + children + "', '" + fullname + "', '" + email + "', '" + phone + "');";


    con.query(sql, function (err) {
        if (err) throw err;

        console.log("booking inserted");
    })

    console.log(sql);

    res.send('');



})



//DELETE

app.get('/delete', function (req, res) {


    con.query('DELETE FROM bookings WHERE id = ? ', req.query.id, function (err, result) {
        res.redirect('/bookings');


        if (err) throw err;

        console.log("booking deleted");

    })


})


//UPDATE
app.get('/editroombooking', function (req, res) {


    con.query('SELECT * FROM bookings WHERE id = ?', req.query.id, function (err, result) {

        res.render('editbooking', { bookinglist: result[0] })

    })

})

app.post('/editroombooking', function (req, res, next) {

    //parameters to get the id for which the booking will be updated
    var param = [
        req.body,
        req.query.id
    ]

    con.query('UPDATE bookings SET ? WHERE id = ?', param, function (err, result) {

        res.redirect('/bookings');

    })
})



//---------------------------------------------------------------------------------------------------------//
//------------------------------------------ RESTAURANT BOOKING INSERT/DELETE/UPDATE-----------------------------------//
//---------------------------------------------------------------------------------------------------------//

//INSERT
app.post('/restaurantnewbooking', function (req, res) {


    //grab variables sent from client side

    var name = req.body.name;
    var bookingdate = req.body.bookingdate;
    var bookingtime = req.body.bookingtime;
    var persons = req.body.persons;
    var phone = req.body.phone;



    //insert into table bookings
    var sql = "INSERT INTO bookrestaurant (name, bookingdate, bookingtime, persons, phone) VALUES ('" + name + "','" + bookingdate + "', '" + bookingtime + "', '" + persons + "', '" + phone + "');";


    con.query(sql, function (err) {
        if (err) throw err;

        console.log("table booking inserted");
    })

    console.log(sql);

    res.send('Reservation Sent');



})

//DELETE

app.get('/deletetable', function (req, res) {


    con.query('DELETE FROM bookrestaurant WHERE id = ? ', req.query.id, function (err, result) {
        res.redirect('/restaurantbookings');

        if (err) throw err;

        console.log("table booking deleted");

    })



})

//UPDATE
app.get('/edittablebooking', function (req, res) {




    con.query('SELECT * FROM bookrestaurant WHERE id = ?', req.query.id, function (err, result) {

        res.render('restauranteditbooking', { resbookinglist: result[0] })

    })

})

app.post('/edittablebooking', function (req, res, next) {

    var param = [
        req.body,
        req.query.id
    ]

    con.query('UPDATE bookrestaurant SET ? WHERE id = ?', param, function (err, result) {

        res.redirect('/restaurantbookings');

    })
})




//---------------------------------------------------------------------------------------------------------//
//--------------------------------- INSERT AND DELETE IMAGES FROM GALLERY AND DASHBOARD--------------------//
//---------------------------------------------------------------------------------------------------------//

// Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where to save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});



app.post("/postImages", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");

        //send message if no image selected
        req.flash('message', 'No image selected!')
        res.redirect('/insertimages');
    } else {
        console.log(req.file.filename)
        var imgsource = req.file.filename
        var insertImages = "INSERT INTO gallery(images)VALUES(?)"
        con.query(insertImages, [imgsource], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
            req.flash('uploadMessage', 'Image inserted successfully!')
            res.redirect('/insertimages');
        })
    }
});

//DELETE IMAGES

app.get('/deleteImages', function (req, res) {


    con.query('DELETE FROM gallery WHERE galleryid = ? ', req.query.id, function (err, result) {


        if (err) throw err;

        req.flash('deleteMessage', 'Image deleted!')
        res.redirect('/insertimages');

        console.log("image deleted");

    })


})

//--------------------------------------------------------------------------------------------------------//
//------------------------------------------ SET ROOM PRICES/DESCRIPTION/QTY-------------------------------//
//---------------------------------------------------------------------------------------------------------//


app.post("/addrooms", upload.single('image'), (req, res) => {

    var room = req.body.room;
    var setQty = req.body.setQty;
    var setDescription = req.body.setDescription;
    var setPrice = req.body.setPrice;




    if (!req.file) {
        console.log("No file upload");

        //send message if no image selected
        req.flash('message', 'No image selected!')
        res.redirect('/createrooms');
    } else {
        console.log(req.file.filename)
        var imgsource = req.file.filename
        var insertImages = "INSERT INTO rooms(images, type, price, qty, description)VALUES('" + imgsource + "','" + room + "', '" + setPrice + "', '" + setQty + "', '" + setDescription + "')"
        con.query(insertImages, [imgsource], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
            req.flash('uploadMessage', 'Room created!')
            res.redirect('/createrooms');
        })
    }
});

//DELETE IMAGES

app.get('/deleteRooms', function (req, res) {


    con.query('DELETE FROM rooms WHERE roomsid = ? ', req.query.id, function (err, result) {


        if (err) throw err;

        req.flash('deleteMessage', 'Room deleted!')
        res.redirect('/createrooms');

        console.log("room deleted ");

    })


})










//disply where app it's available
console.log('app on localhost: 3000');




