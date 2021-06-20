const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const Parent = require('../models/parent');

router.get('/register', (req, res) => {
    res.render('parents/register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, password, mobile, address, email} = req.body;
        const user = new Parent({ username, mobile, email, address});
        const registeredUser = await Parent.register(user, password);
        const newParent = await registeredUser.save();
        const id = registeredUser._id;
        console.log(id);
        req.login(registeredUser, err => {
            if (err) return send("Login Failed!!");
            res.redirect('/login');
        })
    } catch (e) {
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('parents/login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res) => {
    id = req.user._id;
    res.redirect(`/parents/${id}/child`);
})

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;