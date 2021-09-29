const express = require('express');
const router = express.Router();

const {reportByPeriod} = require('../controllers/reports');
const {periodValid} = require('../validators/report');
const isAuth = require('../middleware/isAuth');


router.post('/period',isAuth,periodValid,reportByPeriod);

module.exports = router;