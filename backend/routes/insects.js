const express = require('express');
const router = express.Router();
const insectController = require('../controllers/insectController');

router.post('/navigate', insectController.navigateInsects);

module.exports = router;