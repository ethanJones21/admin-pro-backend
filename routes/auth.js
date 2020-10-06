// path: api/login

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post(
    '/',
    [
        check('email','Email no valido').isEmail(),
        check('password','Contraseña no valido').not().isEmpty(),
        validarCampos
    ],
    login
    );

module.exports = router;