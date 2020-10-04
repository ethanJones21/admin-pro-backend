require('dotenv').config();

const express = require('express');
const cors = require('cors');


// destructuring for database
const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

// configurar cors
// ciertos dominios pueden hacer peticiones a su backend
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// database
dbConnection();

// Rutas
// Usando middlewares para que cuando pase por aqui rediriga al archivo de rutas
app.use('/api/usuarios',require('./routes/usuarios'))


app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto'+process.env.PORT);
} )



