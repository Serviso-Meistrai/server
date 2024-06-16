const express = require("express");
const router = express.Router();
const { createService, getAllServices, deleteService } = require("../controllers/serviceController");
const protectAdmin = require("../middleware/adminAuthMiddleware");

// Route for creating a category
router.post("/", protectAdmin, createService);
// Route for getting all categories
router.get("/", getAllServices);
// Route for deleting a category
router.delete("/:id", protectAdmin, deleteService);

module.exports = router;