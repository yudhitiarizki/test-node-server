const express = require("express");

//function Routes
const { createSales, getSales, deleteSales, getSalesById } = require('../controllers/sales');
 
const router = express.Router();

router.post('/sales', createSales);
router.get('/sales', getSales);
router.delete('/sales/:salesId', deleteSales);
router.get('/sales/:salesId', getSalesById);

module.exports = router;