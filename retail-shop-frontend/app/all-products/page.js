"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);

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

  // Function to handle product update
  const handleUpdate = (id) => {
    // Find the product to update
    const productToUpdate = products.find((product) => product.id === id);
    setUpdateProduct(productToUpdate);
  };

  // Function to handle product deletion
  const handleDelete = (id) => {
    setDeleteProductId(id);
  };

  // Function to confirm product deletion
  const confirmDelete = () => {
    // Define the API endpoint URL for deleting a product
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/items/${deleteProductId}`;

    // Make a DELETE request to the API endpoint using Axios
    axios
      .delete(apiUrl)
      .then(() => {
        // Upon successful response, filter out the deleted product from the products list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== deleteProductId)
        );
        // Close the delete confirmation modal
        setDeleteProductId(null);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error deleting product:", error);
        // Close the delete confirmation modal
        setDeleteProductId(null);
      });
  };

  // Function to handle form submission for product update
  const handleSubmitUpdate = (updatedProduct) => {
    // Define the API endpoint URL for updating a product
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/items/${updatedProduct.id}`;

    // Make a PATCH request to the API endpoint using Axios
    axios
      .patch(apiUrl, updatedProduct)
      .then((response) => {
        // Upon successful response, update the product list
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product) =>
            product.id === response.data.id ? response.data : product
          );
          return updatedProducts;
        });
        // Close the update form modal
        setUpdateProduct(null);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error updating product:", error);
        // Close the update form modal
        setUpdateProduct(null);
      });
  };

  return (
    <section className="">
      <h2 className="text-2xl text-white font-bold mb-4">All Products</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Render the list of products */}
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Quantity: {product.quantity} kg</p>
            {/* Buttons for update and delete */}
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-[#505050] hover:bg-blue-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => handleUpdate(product.id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Delete Confirmation Modal */}
      {deleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 mr-4"
                onClick={() => setDeleteProductId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={confirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Update Form Modal */}
      {updateProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4">Update Product</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitUpdate(updateProduct);
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border rounded-md"
                  value={updateProduct.name}
                  onChange={(e) =>
                    setUpdateProduct({ ...updateProduct, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-semibold mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="w-full px-3 py-2 border rounded-md"
                  value={updateProduct.quantity}
                  onChange={(e) =>
                    setUpdateProduct({
                      ...updateProduct,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 mr-4"
                  onClick={() => setUpdateProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
