const { Router } = require('express');
const { getPerfilById } = require('../controllers/perfilController');
const { obtenerPerfilPorEmail } = require('../controllers/perfilController');
const router = Router();

// Esta es la ruta que tu perfil.js llamará: /perfil/1
router.get('/:id', getPerfilById);
router.get('/email/:email', obtenerPerfilPorEmail);

module.exports = router;