//PACKAGES
const bodyParser = require("body-parser");
const express = require('express');
require('dotenv').config();
const app = express();

//FILES
const transactionRouter = require('./routes/transaction-routes');
const categoryRouter = require('./routes/category-router');
const authRouter = require('./routes/auth-router');
const {launch} = require('./db/connect');

app.use(bodyParser.json());

app.use("/auth",authRouter);
app.use("/category",categoryRouter);
app.use("/transaction",transactionRouter);

launch(app);
