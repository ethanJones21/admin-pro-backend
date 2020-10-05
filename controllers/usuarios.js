const { response } = require('express');//para status, json metodos
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

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
        const salt = bcrypt.genSaltSync();
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

const actualizarUsuario = async(req, res = response)=>{
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            })
        }

        // Actualizaciones
        const campos = req.body;

        if(usuarioDB.email === req.body.email) {//para evitar conflictos con el email unico
            delete campos.email;
        }else{
            const existeEmail = await Usuario.findOne({email: req.body.email});
            if(existeEmail) { //si quieres actualizar tu correo pero ya existe un correo de otra persona
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email',
                })
            }
        }

        delete campos.password;
        delete campos.google;

        // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos); te regresa los datos anteriores que enviaste pero si se guarda el nuevo en mongodb
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos, {new: true});

        // se puede enviar una unica vez
        res.json({
            ok: true,
            msg: 'Usuario actualizado',
            usuario: usuarioActualizado
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
    crearUsuario,
    actualizarUsuario
}