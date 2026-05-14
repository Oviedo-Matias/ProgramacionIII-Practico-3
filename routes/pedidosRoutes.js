const { Router } = require('express');
const { crearPedido } = require('../controllers/pedidosController');
const router = Router();

router.post('/solicitar', crearPedido);

module.exports = router;