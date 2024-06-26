const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserById,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

module.exports = router;