// Ruta: api/usuarios
const { check } = require('express-validator')
const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);

// ruta, middleware[], controller
router.post(
    '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos
    ]
    ,crearUsuario);

router.put(
    '/:id', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El role es obligatorio').not().isEmpty()
    ]
    ,actualizarUsuario);


module.exports = router;