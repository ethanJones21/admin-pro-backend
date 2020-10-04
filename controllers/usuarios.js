const { response } = require('express');//para status, json metodos
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario')

const getUsuarios = async(req, res)=>{

    const usuarios = await Usuario.find({},'nombre email role google')

    res.json({
        ok: true,
        msg: 'get Usuarios',
        usuarios
    })
}

const crearUsuario = async(req, res = response)=>{

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña hash de una sola via imposible tomar la contraseña encriptada y regresar a la original
        const salt = bcrypt.getSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();

        // se puede enviar una unica vez
        res.json({
            ok: true,
            msg: 'Usuario creado',
            usuario
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
}



module.exports = {
    getUsuarios,
    crearUsuario
}