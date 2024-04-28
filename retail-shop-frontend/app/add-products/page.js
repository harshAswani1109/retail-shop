"use client";

import React, { useState } from "react";
import axios from "axios";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/items`,
        formData
      );
      if (response.data.success) {
        setResponseMessage("Item added successfully!");
      }
    } catch (error) {
      setResponseMessage("Error: Unable to add item");
      console.error("Error:", error);
    }
  };

  return (
    <section className="h-screen">
      {" "}
      <div className="bg-white p-8 rounded-lg shadow-md ">
        <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input mt-1 block w-full h-10 px-2 border-1 border-[#505050]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">
              Quantity: (In kg)
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="form-input mt-1 block w-full h-10 px-2 border-1 border-[#505050]"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#505050] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </form>
        {responseMessage && (
          <p className="text-red-500 mt-4">{responseMessage}</p>
        )}
      </div>
    </section>
  );
}
