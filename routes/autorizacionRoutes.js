const { Router } = require('express');
const { login } = require('../controllers/autorizacionController');
const { registrarUsuario } = require('../controllers/registroController');

const router = Router();

// Aquí es donde se define el método POST.
router.post('/login', login); 
router.post('/register', registrarUsuario);

module.exports = router;