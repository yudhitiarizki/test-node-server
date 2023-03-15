const express = require("express");

//function Routes
const { createItems, getItems, deleteItems, getItemById, updateItems } = require('../controllers/item');
const { authItems } = require('../middlewares/authBody');

const router = express.Router();

router.post('/items', authItems, createItems);
router.get('/items', getItems);
router.delete('/items/:itemId', deleteItems);
router.get('/items/:itemId', getItemById);
router.put('/items/:itemId', updateItems);

module.exports = router;