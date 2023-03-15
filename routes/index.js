const express = require("express");

const router = express.Router();

const item = require('./item');
const customer = require('./customer');
const sales = require('./sales');

//Routes
router.use(sales, item, customer);

module.exports = router;