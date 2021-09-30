const express = require('express');
const router = express.Router();

const {reportDays,reportPeriodTotal} = require('../controllers/reports');
const {periodValid} = require('../validators/report');
const isAuth = require('../middleware/isAuth');


router.post('/periodTotal',isAuth,periodValid,reportPeriodTotal);

router.post('/periodDays',isAuth,periodValid,reportDays);



module.exports = router;