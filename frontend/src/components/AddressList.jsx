import React, { useEffect, useState } from "react";
import axios from "axios";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/addresses");
        setAddresses(response.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 ">Saved Addresses</h2>
      <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <li
              key={address._id}
              className="p-4 border-b last:border-none border-gray-300 rounded-md hover:bg-gray-50 transition duration-300"
            >
              <p className="text-lg font-semibold text-gray-700">
                {address.houseNumber}
              </p>
              <p className="text-sm text-gray-500">{address.area}</p>
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  address.category === "Home"
                    ? "bg-blue-100 text-blue-600"
                    : address.category === "Office"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {address.category}
              </span>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No addresses found.</p>
        )}
      </ul>
    </div>
  );
};

export default AddressList;
