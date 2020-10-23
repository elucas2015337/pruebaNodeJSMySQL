const express = require('express');
const router = express.Router();

const pool = require('../database');

// router.get('/add', (req, res) =>{
//     res.render('vehicles/add');
// }) ;

router.post('/add', (req, res) =>{

    var {brand, model, year, plates, vehicle_status} = req.body; //definición de variables
    year = Number(year) //conversión de string a integer

    //almacenando variables
    const newVehicle = {
        brand,
        model,
        year,
        plates,
        vehicle_status
    };
    //ejecutando petición
    pool.query('INSERT INTO vehicles set ?',[newVehicle], (error, results, fields) => { 
        if(error) { 
            console.log(error); 
            return res.status(500).send('error'); 
        }
        res.redirect('/vehicle');
    });
});

//Obteniendo los datos para listarlos en una datatable
router.get('/', async (req, res) =>{
    const vehicles = await pool.query('SELECT * FROM vehicles');
    console.log(vehicles);
    res.render('vehicles/list', { vehicles })
});

// router.get('/delete/id', async (req, res)=>{
//     console.log(req.params.id);
//     res.send('Eliminado')
// });


//Eliminar el vehículo
router.get('/delete/:id', async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM vehicles WHERE id = ?', [id]);
    res.redirect('/vehicle')
});

//Obtener datos de vehículo para eliminrlo o editarlo
router.get('/edit/:id', async (req, res)=>{
    const { id } = req.params;
    const vehicles = await pool.query('SELECT * FROM vehicles WHERE id = ?', [id]);
    console.log(vehicles[0]);
    res.render('vehicles/edit_delete', {vehicles: vehicles[0]});
});

//Editar vehículo
router.post('/edit/:id', async (req, res)=>{
    const { id } = req.params;
    const { brand, model, year, plates, vehicle_status } = req.body;
    const updatedVehicle = {
        brand,
        model,
        year,
        plates,
        vehicle_status
    }
    console.log(updatedVehicle);
    await pool.query('UPDATE vehicles set ? where id = ?', [updatedVehicle, id])
    res.redirect('/vehicle')
});

module.exports = router;