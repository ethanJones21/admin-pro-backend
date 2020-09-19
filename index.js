require('dotenv').config();

const express = require('express');
const cors = require('cors');


// destructuring for database
const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

// configurar cors
app.use(cors());

// database
dbConnection();

app.get('/', (req, res)=>{
    res.json({
        ok: true,
        msg: 'hola mundo'
    })
})

app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto'+process.env.PORT);
} )



