const Ad = require('../models/adModel');
const Likes = require('../models/likesModel');
const Service = require('../models/serviceModel');
const asyncHandler = require("express-async-handler");

// Controller function to create an ad
const createAd = asyncHandler(async (req, res) => {
  const { name, surname, specialization, img, serviceName, city } = req.body;

  // Validate input
  if (!name || !surname || !specialization || !img || !serviceName || !city) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const serviceObj = await Service.findOne({ name: serviceName });

  if (!serviceObj) {
    return res.status(400).json({ error: 'Service not found' });
  }

  // Create a new ad document
  const newAd = new Ad({
    name,
    surname,
    specialization,
    img,
    serviceName: serviceObj._id,
    city,
    user: req.user._id,
  });

  // Save the ad document to the database
  const savedAd = await newAd.save();

  // Send the response with the saved ad document
  res.status(201).json(savedAd);
});

// Controller function to get all ads
const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find().populate('user').populate('likes').populate('serviceName');
  res.status(200).json(ads);
});

// Controller function to get ads by user
const getUserAds = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Get the authenticated user's ID
  const userAds = await Ad.find({ user: userId }).populate('user').populate('likes').populate('serviceName');
  res.status(200).json(userAds);
});

// Controller function to update an ad
const updateAd = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  const userId = req.user._id; // Assume `req.user` contains the authenticated user's information
  const { name, surname, specialization, img, serviceName, city } = req.body;

  // Validate input
  if (!name || !surname || !specialization || !img || !serviceName || !city) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const serviceObj = await Service.findOne({ name: serviceName });

  if (!serviceObj) {
    return res.status(400).json({ error: 'Service not found' });
  }

  // Find the ad by id and user id
  let ad = await Ad.findOne({ _id: adId, user: userId });

  if (!ad) {
    return res.status(404).json({ error: 'Ad not found or not authorized to update this ad.' });
  }

  // Update the ad document
  ad = await Ad.findByIdAndUpdate(adId, {
    name,
    surname,
    specialization,
    img,
    serviceName: serviceObj._id,
    city
  }, { new: true }); // Set { new: true } to return the updated document

  res.status(200).json(ad);
});

// Controller function to delete an ad by id
const deleteAd = asyncHandler(async (req, res) => {
  const adId = req.params.id;
  const userId = req.user._id; 

  // Find the ad by id and user id
  const ad = await Ad.findOne({ _id: adId, user: userId });

  if (!ad) {
    return res.status(404).json({ error: 'Ad not found or not authorized to delete this ad.' });
  }

  // Delete the associated likes
  await Likes.deleteMany({ ad: adId });

  // Delete the ad
  await Ad.findByIdAndDelete(adId);

  res.status(200).json({ message: 'Ad deleted successfully.' });
});

module.exports = {
  createAd,
  getAllAds,
  getUserAds,
  updateAd,
  deleteAd
};
