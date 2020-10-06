const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response)=>{
    
    const { email, password } = req.body;

    try {
        // Validar Email
        const usuarioDB = await Usuario.findOne({ email });

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Validar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)

        if( !validPassword ){
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })
        }

        // Generar JWT moongose va a saber id = _id
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            msg: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Error inesperado'
        })
    }
}

module.exports = {
    login
}