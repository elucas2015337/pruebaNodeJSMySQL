const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const path = require('path');
const { dirname } = require('path');
//Inicializaciones

const app = express();

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

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables globales

app.use((req, res, next)=>{
    next();
})

//routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/vehicle', require('./routes/vehicles'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//Iniciando el servidor 

app.listen(app.get('port'), () =>{
    console.log('El servidor esta corriendo en el puerto: ', app.get('port'));
})