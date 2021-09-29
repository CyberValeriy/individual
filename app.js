//PACKAGES
const express = require('express');
require('dotenv').config();
const app = express();

//FILES
const transactionRouter = require('./routes/transaction-routes');
const categoryRouter = require('./routes/category-router');
const reportRouter = require('./routes/report-router');
const authRouter = require('./routes/auth-router');
const {launch} = require('./db/connect');

app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/report",reportRouter);
app.use("/api/category",categoryRouter);
app.use("/api/transaction",transactionRouter);

launch(app);
