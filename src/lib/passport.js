const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

//Estrategias de autenticación


 passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows  = await pool.query('SELECT * FROM users Where username = ?', [username]);
    if (rows.lenth > 0){
        const user = rows[0];
        const validPassword = await helpers.passwordCompare(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success' ,'Bienvenido ' + user.username));
        } else {
            done(null, false, req.flash('message', 'contraseña incorrecta'));
        }
    } else  {
        return done(null, false, req.flash('message' ,'Este nombre de usuario no está registrado'));
    }
}));


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    }
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users set ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser);
}));
//serializar usuario
passport.serializeUser((user, done) => {
    done(null, user.id);

});

//deserializar usuario
passport.deserializeUser( async (id, done) =>{
    const rows = await pool.query('SELECT * FROM users Where id = ? ', [id]);
    done(null, rows[0]);
});