const express = require('express');
const router = express.Router();

const {getCategory,addCategory,deleteCategory,updateCategory} = require('../controllers/category');
const {addValid,deleteValid,updateValid} = require('../validators/category');
const isAuth = require('../middleware/isAuth');


router.post('/add',isAuth,addValid,addCategory);

router.put('/update',isAuth,updateValid,updateCategory);

router.delete('/delete',isAuth,deleteValid,deleteCategory);

router.get('/',isAuth,getCategory);

module.exports = router;