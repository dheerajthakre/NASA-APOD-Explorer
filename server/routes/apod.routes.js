const express = require('express');
const router = express.Router();
const apodController = require('../controllers/apod.controller');

// GET /api/apod/today
router.get('/today', apodController.getTodayAPOD);

// GET /api/apod/:date  (YYYY-MM-DD)
router.get('/:date', apodController.getAPODByDate);

// GET /api/apod?start=YYYY-MM-DD&end=YYYY-MM-DD or ?count=N
router.get('/', apodController.getAPODRange);

module.exports = router;
