const express = require('express');
const router = express.Router({ mergeParams: true });
const {isLoggedIn} = require('../middleware');
const Parent = require('../models/parent');
const Child = require('../models/child');
const Question = require('../models/responses');
const catchAsync = require('../utils/catchAsync');
const twilio = require('twilio');
const nodemailer = require('nodemailer');

router.get('/parents/:id/child', isLoggedIn, catchAsync(async (req, res) => {
    const id = req.params.id;
    res.render('assessment/assessment', {id});
}))

router.get('/parents/:id/basicAssessment', isLoggedIn, catchAsync(async (req, res) => {
    const id = req.params.id;
    res.render('assessment/basicAssessment', {id});
}))

router.get('/parents/:id/assessment', isLoggedIn, catchAsync(async (req, res) => {
    const id = req.params.id;
    res.render('assessment/assessment', {id});
}))

router.post('/parents/:id/child', isLoggedIn, catchAsync(async (req, res) => {
    const parent = await Parent.findById(req.params.id);
    const {name, sex, dob, bloodGroup, 
        relationship, height, weight, term, 
        diseaseMother, Head, ShortNeck, Limp, 
        whiteEye, shortnessBreath, weight2} = req.body;
    
    //1) Add data in response
    const response = new Question({
        "answers": [height, weight, term, 
            diseaseMother, Head, ShortNeck, Limp, 
            whiteEye, shortnessBreath, weight2]
    });
    await response.save();
    
    //2) Add data and response in child
    const newChild = new Child({
        "name": name,
        "sex": sex,
        "dob": dob,
        "bloodGroup": bloodGroup,
        "relationship" : relationship,
        "responses": [response]
    });
    await newChild.save();

    //3) Add child in parent
    await parent.children.push(newChild);
    await parent.save();

    // UnComment to send Remender
    const accountSid = process.env.API_KEY; 
    const authToken = process.env.AUTH_TOKEN;
    const client = new twilio(accountSid, authToken);
    const mailTransporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_PASS,
    }})
    const mailDetails = {
        from: process.env.SENDER_MAIL,
        to: process.env.RECEIVER_MAIL,
        subject: 'Registration added!!',
        text: 'Hey! New user registered.'
    };

    await client.messages.create({
        body: 'This is a test message!!',
        to: process.env.RECEIVER_NUMBER,  
        from: process.env.SENDER_NUMBER,
    })
    .then((message) => mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            res.redirect(`/parents/${req.params.id}/child`);
        }
    }));

    res.redirect(`/parents/${req.params.id}/child`);
}))


module.exports = router;