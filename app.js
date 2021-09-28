const express = require('express');
const app = express();
require('dotenv').config();
const {launch} = require('./db/connect');
const bodyParser = require("body-parser");
const authRouter = require('./routes/auth-router');
const categoryRouter = require('./routes/category-router');

app.use(bodyParser.json());

app.use("/auth",authRouter);
app.use("/category",categoryRouter);

launch(app);
