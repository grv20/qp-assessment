const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const checkUserType = require("../middleware/checkUserType");
const {
  getAllGroceries,
  addGrocery,
  getGroceryDetails,
  updateGrocery,
  purchaseGrocery,
} = require("../controllers/groceryController");

router.get("/", authenticate, getAllGroceries);
router.post("/", authenticate, checkUserType("admin"), addGrocery);
router.get("/:id/", authenticate, checkUserType("admin"), getGroceryDetails);
router.put("/:id/", authenticate, checkUserType("admin"), updateGrocery);

router.put("/:id/purchase", authenticate, purchaseGrocery);

module.exports = router;
