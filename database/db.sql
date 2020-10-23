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

-- alter table vehicles
--      modify plates varchar(8) not null;