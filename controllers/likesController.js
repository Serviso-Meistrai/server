const Likes = require('../models/likesModel');
const Ad = require('../models/adModel');
const asyncHandler = require("express-async-handler");

// Controller function to create a like
const createLike = asyncHandler(async (req, res) => {
  const { value, adId } = req.body;
  const userId = req.user._id;

  // Validate input
  if (!value || !adId) {
    return res.status(400).json({ error: 'Value, userId, and adId are required.' });
  }

  // Check if the user has already liked the ad
  const existingLike = await Likes.findOne({ user: userId, ad: adId });
  if (existingLike) {
    return res.status(400).json({ error: 'You have already liked this ad.' });
  }

  // Create a new like document
  const newLike = new Likes({
    value,
    user: req.user._id,
    ad: adId,
  });

  // Save the like document to the database
  const savedLike = await newLike.save();

  // Update the corresponding ad document to push the new like
  await Ad.findByIdAndUpdate(adId, { $push: { likes: savedLike._id } });

  // Send the response with the saved like document
  res.status(201).json(savedLike);
});

// Controller function to update a like
const updateLike = asyncHandler(async (req, res) => {
  const { value } = req.body;
  const likeId = req.params.id;

  // Validate input
  if (!value) {
    return res.status(400).json({ error: 'Value is required.' });
  }

  // Find the like by id
  let like = await Likes.findById(likeId);

  if (!like) {
    return res.status(404).json({ error: 'Like not found.' });
  }

  // Update the like document
  like.value = value;
  await like.save();

  // Find the corresponding Ad document
  const ad = await Ad.findOne({ likes: likeId });

  if (!ad) {
    return res.status(404).json({ error: 'Ad not found for the given like.' });
  }

  // Find the index of the like in the likes array of the Ad document
  const likeIndex = ad.likes.findIndex(likeObj => likeObj._id.equals(likeId));

  if (likeIndex === -1) {
    return res.status(404).json({ error: 'Like not found in the Ad document.' });
  }

  // Update the value of the like in the likes array of the Ad document
  ad.likes[likeIndex].value = value;

  // Save the updated Ad document
  await ad.save();

  res.status(200).json(like);
});

module.exports = {
  createLike,
  updateLike
};
