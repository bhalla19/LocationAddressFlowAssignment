const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  area: { type: String, required: true },
  category: { type: String, enum: ["Home", "Office", "Friends & Family"], required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Address", AddressSchema);
