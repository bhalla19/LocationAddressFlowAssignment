const express = require("express");
const Address = require("../models/Address");

const router = express.Router();

// Create Address
router.post("/", async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: "Failed to save address" });
  }
});

// Get All Addresses
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch addresses" });
  }
});

// Delete Address
router.delete("/:id", async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete address" });
  }
});

module.exports = router;
