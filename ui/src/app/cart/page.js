"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { baseApi } from "../constants/api";
import Delete from "../components/svgs/Delete";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null); // For modal
  const router = useRouter();

  // Abstract API calls
  const apiCall = async (url, method = "GET", data = null) => {
    try {
      const response = await axios({
        method,
        url: `${baseApi}${url}`,
        data,
      });
      return response.data;
    } catch (err) {
      console.error(`Error with API call to ${url}:`, err);
      throw err;
    }
  };

  // Fetch cart items
  const fetchCartItems = async () => {
    try {
      const data = await apiCall("/cart/items");
      setCartItems(data);
      setLoading(false);
    } catch {
      setError("Failed to load cart. Please try again later.");
      setLoading(false);
    }
  };

  // Add item to cart (prevents duplicates)
  const addItemToCart = async (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      // Update quantity if item already exists
      await updateCartItem(
        existingItem._id,
        existingItem.quantity + item.quantity
      );
    } else {
      await apiCall("/cart/add", "POST", item);
    }
    fetchCartItems();
  };

  // Remove item from cart
  const removeCartItem = async (id, quantity) => {
    await apiCall(`/cart/remove?Id=${id}&quantity=${quantity}`, "DELETE");
    fetchCartItems();
  };

  // Update item quantity
  const updateCartItem = async (id, quantity) => {
    const item = cartItems.find((cartItem) => cartItem._id === id);
    if (item) {
      await apiCall("/cart/add", "POST", { ...item, quantity });
      fetchCartItems();
    }
  };

  // Checkout and display modal with order ID
  const checkout = async () => {
    try {
      const data = await apiCall("/checkoutItems/add", "POST", {
        items: cartItems,
      });
      setOrderId(data.orderId);
    } catch {
      alert("Checkout failed. Please try again.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4 min-h-screen text-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Cart Details</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="max-w-xl shadow-lg  overflow-y-auto rounded px-5 py-5 mx-auto">
          {cartItems.map((item, id) => (
            <div
              key={id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg mt-3 ">
                    <img src={item.imageUrl} alt={item.name} />
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
                <button
                  onClick={() => updateCartItem(item._id, item.quantity - 1)}
                  className="bg-gray-300 p-1 rounded"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <p className="text-sm font-semibold">{item.quantity}</p>
                <button
                  onClick={() => updateCartItem(item._id, item.quantity + 1)}
                  className="bg-gray-300 p-1 rounded"
                >
                  +
                </button>
                <p className="text-sm font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
                <div
                  onClick={() => removeCartItem(item._id, item.quantity)}
                  className="cursor-pointer text-white p-1 rounded"
                >
                  <Delete />
                </div>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 flex justify-between text-sm font-bold">
            <span>Total Items: {totalQuantity}</span>
            <span>Total: ${totalPrice}</span>
          </div>
          <div className="text-end">
            <button
              onClick={checkout}
              className="px-4 bg-black text-white py-2 mt-4 rounded"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Modal for Order ID */}
      {orderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black  bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg text-center w-64 h-40">
            <h2 className="text-lg font-bold">Order Confirmed!</h2>
            <p>Order ID: {orderId}</p>
            <button
              onClick={() => router.push("/")}
              className="mt-8 bg-black text-white py-2 px-4 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
