/***************APP VARIABLES***************/
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');
const DataBaseConnect = require("./database/connection");
const methodOverride = require('method-override');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const Parent = require('./models/parent');
const Question = require('./models/responses');
const Child = require('./models/child');
const twilio = require('twilio');

/**************CONFIGURATIONS**************/
DataBaseConnect();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(require('express-session')({
    secret: "secretsecretsecretsecretsecret",
    resave: false,
    saveUninitialized: true
}))

/**************MIDDLEWARES**************/
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Parent.authenticate()));
passport.serializeUser(Parent.serializeUser());
passport.deserializeUser(Parent.deserializeUser());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


/*************ROUTER VARIABLES*************/
const users = require('./routes/users');
const assessment = require('./routes/assessment');
const child = require('./routes/child');


/****************ROUTERS****************/
app.get('/', (req, res)=>{
    res.render('index');
});

app.get('/adminUserDashboard', async (req, res)=>{
    var totalResponses;
    await Question.countDocuments({}, function(err, c) {
        totalResponses = c;
    });
    var totalChild;
    await Child.countDocuments({}, function(err, c) {
        totalChild = c;
    });
    res.render('dashboard/dashboard', {
        "data": 40, 
        "totalResponses": totalResponses,
        "totalChild": totalChild
    });
})

app.use('/', users);
app.use('/', assessment);
app.use('/', child);

app.post('/sms', async(req, res) => {
    var accountSid = process.env.API_KEY; 
    var authToken = process.env.AUTH_TOKEN;   
    
    var client = new twilio(accountSid, authToken);
    
    await client.messages.create({
        body: 'This is a test message!!',
        to: process.env.RECEIVER_NUMBER,  
        from: process.env.SENDER_NUMBER,
    })
    .then((message) => res.send(message.sid));
    app.get('*', (req, res) => {
        res.send("404 Page Not Found!!");
    })
})

app.post('/mail', async(req, res) => {
let mailTransporter = await nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASS,
    }
});


 
let mailDetails = {
    from: process.env.SENDER_MAIL,
    to: process.env.RECEIVER_MAIL,
    subject: 'Registration added!!',
    text: 'Hey! New user registered.'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log(err);
    } else {
        res.send('Email sent successfully');
    }
});
});
/****************SERVER****************/
app.listen(3000 ,()=>{
    console.log("Server Started at port 3000...");
})
