const { Router } = require('express');
const { registrarUsuario } = require('../controllers/registroController.js');
const router = Router();

router.post("/", registrarUsuario);

module.exports = router;