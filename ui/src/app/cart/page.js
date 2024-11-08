export default function CartScreen() {
  const cartItems = [
    {
      name: "Margherita Pizza",
      quantity: 2,
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
      specialInstructions: "Add extra cheese",
    },
    {
      name: "Caesar Salad",
      quantity: 1,
      price: 6.49,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",

      specialInstructions: "No croutons",
    },
    {
      name: "Grilled Chicken Sandwich",
      quantity: 1,
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
    },
    {
      name: "French Fries",
      quantity: 3,
      price: 2.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",

      specialInstructions: "Make it crispy",
    },
    {
      name: "Lemonade",
      quantity: 2,
      price: 1.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
    },
  ];

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-4">
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
