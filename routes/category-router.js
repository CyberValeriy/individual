const express = require('express');
const router = express.Router();

const {getCategory} = require('../controllers/category');
const isAuth = require('../middleware/isAuth');

router.get('/',isAuth,getCategory);

module.exports = router;