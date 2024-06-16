const Service = require('../models/serviceModel');
const Ad = require('../models/adModel'); 
const asyncHandler = require('express-async-handler');

// Create a new category
// Route: POST /api/categories
// Access: Private
const createService = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('Please provide a service name');
  }

  const serviceExists = await Service.findOne({ name });

  if (serviceExists) {
    res.status(400);
    throw new Error('Service already exists');
  }

  const service = await Service.create({ name });

  if (service) {
    res.status(201).json(service);
  } else {
    res.status(400);
    throw new Error('Invalid service data');
  }
});

// Get all categories
// Route: GET /api/categories
// Access: Public
const getAllServices = asyncHandler(async (req, res) => {
  const service = await Service.find();
  res.json(service);
});

// Delete category by ID
// Route: DELETE /api/categories/:id
// Access: Private (assuming only admin can delete a category)
const deleteService = asyncHandler(async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Delete ads with the deleted service
      await Ad.deleteMany({ serviceName: req.params.id });
  
      // Delete the service itself
      await service.deleteOne();
  
      res.json({ message: 'Service and related ads removed' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = { createService, getAllServices, deleteService };