# pruebaNodeJSMySQL
_Prueba de desarrollo de una aplicación simple con nodeJS y MySQL_

## Pre-requisitos 📋
_Se deben tener instalados los siguientes servicios para el funcionamiento de la aplicación_

* MySQL Server (En mi caso utilicé el servicio de Xampp para una instalación sencilla)
* NodeJS

### Configuración de entorno 🔧

_Para levantar la aplicación se requiere instalar las dependencias, ejecutar el script con la base de datos y las tablas y configurar las credenciales_

_Abrir un nuevo terminal del proyecto y ejecutar el comando_

```
npm install
```

_se puede cambiar el puerto en el que queremos levantar la aplicación en el archivo index.js_

```javascript
//index.js
app.set('port', process.env.PORT || 3000 ); //<== modificar el número de puerto
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');
```

_Configurar credenciales de acuerdo a nuestro usuario en MySQL, ya que utilicé xampp, mi usuario root no tiene una contraseña definida por lo que envio un campo vacío_

```javascript
// keys.js
//Dirección y credenciales de la base de datos

module.exports = {
    database:{
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'vehiclesDB'
    }
}
```

_Abrir un nuevo terminal de mysql e iniciar sesión_

```
mysql -u root -p
```

_Ejecutar el script db.sql_

```sql

-- db.sql
CREATE DATABASE vehiclesDB;

use vehiclesDB;

-- Tabla de usuarios

CREATE TABLE users(
    id INT(5) NOT NULL AUTO_INCREMENT,
    fullname VARCHAR(80) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(25) NOT NULL,
    PRIMARY KEY PK_users (id)
);

--Tabla de vehículos

CREATE TABLE vehicles(
    id INT(5) NOT NULL AUTO_INCREMENT,
    brand VARCHAR(15) NOT NULL,
    model VARCHAR(15) NOT NULL,
    year INT(4) NOT NULL,
    plates VARCHAR(8) NOT NULL,
    vehicle_status VARCHAR(20) NOT NULL,
    userID INT(5),
    PRIMARY KEY PK_vehicles (id),
    CONSTRAINT FK_vehicle_users FOREIGN KEY (userID) references users(id) ON DELETE CASCADE

);
```

_Ejecutar en el terminal el siguiente comando pra iniciar la aplicación_

```
npm start
```

_En caso de error con los privilegios o con la protección contra scripts de windows puede consultar los siguientes enlaces_

* https://stackoverflow.com/questions/4037939/powershell-says-execution-of-scripts-is-disabled-on-this-system
* https://stackoverflow.com/questions/41645309/mysql-error-access-denied-for-user-rootlocalhost


_Quedo atento a cualquier duda_
