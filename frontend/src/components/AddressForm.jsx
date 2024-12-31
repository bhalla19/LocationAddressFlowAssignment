import React, { useState } from "react";
import axios from "axios";
import Map from "./MapsWithMarker";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    houseNumber: "",
    area: "",
    category: "Home",
    location: { lat: 37.7749, lng: -122.4194 },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/addresses", formData);
      alert("Address saved successfully!");
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Save Your Address
      </h1>
      <Map
        location={formData.location}
        onLocationChange={(location) => setFormData({ ...formData, location })}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="House/Flat/Block No."
          value={formData.houseNumber}
          onChange={(e) =>
            setFormData({ ...formData, houseNumber: e.target.value })
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
        <input
          type="text"
          placeholder="Apartment/Road/Area"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
