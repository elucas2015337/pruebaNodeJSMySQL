const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path');
const { dirname } = require('path');
const session = require('express-session');
const mySQLStore = require('express-mysql-session');
const passport = require('passport');
const flash = require('connect-flash');

const { database } = require('./keys');

//Inicializaciones

const app = express();
require('./lib/passport');

//configuraciones

app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'sqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new mySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales

app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
  });

//routes
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/vehicle', require('./routes/vehicles'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciando el servidor 

app.listen(app.get('port'), () =>{
    console.log('El servidor esta corriendo en el puerto: ', app.get('port'));
})