const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { getAllUsers } = require("../controllers/userController");

router.get("/", authenticate, getAllUsers);

module.exports = router;
