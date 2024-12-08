"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../constants/api";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`${baseApi}/cart/items`);
      console.log({ response });
      setCartItems(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      setError("Failed to load cart. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Cart Details</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="max-w-xl shadow-lg h-[74vh] overflow-y-auto rounded px-5 py-5 mx-auto">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg mt-3 ">
                    <img src={item.image} />
                  </div>
                  <p className="font-medium">{item.name}</p>
                </div>

                {item.specialInstructions && (
                  <p className="text-sm text-gray-500">
                    Special Instructions: {item.specialInstructions}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-4">
                {/* <p className="text-lg font-semibold">x{item.quantity}</p> */}
                <p className="text-lg font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 flex justify-between text-xl font-bold">
            <span>Total Items: 5</span>
            <span>Total: ${totalPrice}</span>
          </div>
        </div>
      )}
    </div>
  );
}
