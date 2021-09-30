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

app.set("Access-Control-Allow-Origin", "*");
app.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
app.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

app.use("/api/auth",authRouter);
app.use("/api/report",reportRouter);
app.use("/api/category",categoryRouter);
app.use("/api/transaction",transactionRouter);


launch(app);
