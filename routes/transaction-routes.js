const express = require('express');
const router = express.Router();

//CONTROLLERS
const {addTransaction,deleteTransaction,getTransactions,updateTransaction} = require('../controllers/transaction');

//VALIDATORS
const {addValid,deleteValid,updateValid} = require('../validators/transaction');

//MIDLEWARE
const isAuth = require('../middleware/isAuth');


router.post('/add',isAuth,addValid,addTransaction);

router.put('/update',isAuth,updateValid,updateTransaction);

router.delete('/delete',isAuth,deleteValid,deleteTransaction);

router.get('/',isAuth,getTransactions);

module.exports = router;