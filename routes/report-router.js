const express = require('express');
const router = express.Router();

//CONTROLLERS
const {reportDays,reportPeriodTotal} = require('../controllers/reports');

//VALIDATORS
const {periodValid} = require('../validators/report');

//MIDLEWARE
const isAuth = require('../middleware/isAuth');


router.post('/periodTotal',isAuth,periodValid,reportPeriodTotal);

router.post('/periodDays',isAuth,periodValid,reportDays);



module.exports = router;