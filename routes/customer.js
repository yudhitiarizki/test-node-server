const express = require("express");

//function Routes
const { createCustomers, getCustomer, deleteCustomer, getCustomerbById, updateCustomer } = require('../controllers/customer');
const { authCustomer } = require('../middlewares/authBody')
 
const router = express.Router();

router.post('/customer', authCustomer, createCustomers);
router.get('/customer', getCustomer);
router.delete('/customer/:customerId', deleteCustomer);
router.get('/customer/:customerId', getCustomerbById);
router.put('/customer/:customerId', updateCustomer);

module.exports = router;