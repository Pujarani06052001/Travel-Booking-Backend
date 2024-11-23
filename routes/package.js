import express from 'express';
import Package from '../models/package.js';
import { authenticateAdmin } from './admin.js';

const router = express.Router();

// Create a new package
router.post('/', authenticateAdmin, async (req, res) => {
  const packageData = req.body;
  try {
    // Validate the incoming package data if necessary
    const newPackage = await Package.create(packageData);
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create package: ' + error.message });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch packages: ' + error.message });
  }
});

// Update an existing package (Edit)
router.put('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    // Find and update the package by ID
    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update package: ' + error.message });
  }
});

// Delete a package
router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(204).send(); // Successfully deleted
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete package: ' + error.message });
  }
});

export default router;
