const express = require('express');
const { createAd, getAllAds, getUserAds, updateAd, deleteAd } = require('../controllers/adController');
const { protect } = require("../middleware/authMiddleware");
const protectAdmin = require("../middleware/adminAuthMiddleware");

const router = express.Router();

// Route to create an ad
router.post('/', protectAdmin, createAd);

// Route to get all ads
router.get('/', getAllAds);

// Route to get ads created by the authenticated user
router.get('/user', protect, getUserAds);

// Route to update an ad by id
router.put('/:id', protect, updateAd);

// Route to delete an ad by id
router.delete('/:id', protectAdmin, deleteAd);

module.exports = router;
