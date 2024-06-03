const express = require('express');
const { createLike, updateLike } = require('../controllers/likesController');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to create a like
router.post('/', protect, createLike);

// Route to update a like
router.put('/:id', protect, updateLike);

module.exports = router;
