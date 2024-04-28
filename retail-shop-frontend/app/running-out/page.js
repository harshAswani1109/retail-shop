"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/items`;

    // Make a GET request to the API endpoint using Axios
    axios
      .get(apiUrl)
      .then((response) => {
        // Upon successful response, update the state with the fetched products
        setProducts(response.data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error fetching products:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once after initial render

  const filteredProducts = products.filter((product) => product.quantity <= 50);

  return (
    <section className="h-screen">
      <h2 className="text-2xl text-white font-bold mb-4">
        Products Running Out
      </h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Render the list of products */}
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-lg shadow-md p-4 ${
              product.quantity < 10
                ? "text-red-500"
                : product.quantity < 50
                ? "text-yellow-500"
                : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-600">
              {product.name}
            </h3>
            <p className="">Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
