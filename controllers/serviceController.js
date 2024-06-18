const Service = require('../models/serviceModel');
const Ad = require('../models/adModel');
const asyncHandler = require('express-async-handler');

// Create a new service
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

// Get all services
const getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Update service by ID
const updateService = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const service = await Service.findById(req.params.id);

  if (!service) {
    res.status(404);
    throw new Error('Service not found');
  }

  service.name = name || service.name;
  const updatedService = await service.save();
  res.json(updatedService);
});

// Delete service by ID
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

module.exports = { createService, getAllServices, updateService, deleteService };
