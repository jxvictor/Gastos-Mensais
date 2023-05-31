const express = require('express');
const router = express.Router();

const gastoController = require('../controller/gastoController');

gastoController(router);

module.exports = router;