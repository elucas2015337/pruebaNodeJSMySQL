const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req, res)=>{
    res.render('auth/signup');
})

// router.post('/signup', (req, res)=>{
//     passport.authenticate('local.signup', {
//         successRedirect: '/profile',
//         failureRedirect: '/signup',
//         failureFlash: true
//     });
//     res.send('Recibido');
// });

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}))

router.get('/profile', (req, res)=>{
    res.send('Este es tu perfil')
})

router.post('/signin', (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    })(req, res, next);
} )

module.exports = router;