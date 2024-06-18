const express = require("express");
const router = express.Router();
const { createService, getAllServices, deleteService, updateService } = require("../controllers/serviceController");
const protectAdmin = require("../middleware/adminAuthMiddleware");


router.post("/", protectAdmin, createService);

router.get("/", getAllServices);

router.put("/:id", protectAdmin, updateService);

router.delete("/:id", protectAdmin, deleteService);

module.exports = router;