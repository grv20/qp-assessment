const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { placeOrder } = require("../controllers/orderController");

router.post("/", authenticate, placeOrder);

module.exports = router;
