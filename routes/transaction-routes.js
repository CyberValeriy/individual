const express = require('express');
const router = express.Router();

const {addTransaction,deleteTransaction,getTransactions,updateTransaction} = require('../controllers/transaction');
const {addValid,deleteValid,updateValid} = require('../validators/transaction');
const isAuth = require('../middleware/isAuth');


router.post('/add',isAuth,addValid,addTransaction);

router.put('/update',isAuth,updateValid,updateTransaction);

router.delete('/delete',isAuth,deleteValid,deleteTransaction);

router.get('/',isAuth,getTransactions);

module.exports = router;