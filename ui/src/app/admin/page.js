"use client";
import React, { useEffect, useState } from "react";
import Stomp from 'stompjs';

const AdminOrders = () => {
  // Temporarily putting code here for easy reference
  const [message, setMessage] = useState('');
  const connectRabbit = (onMessageCallback) => {
    let stompClient;

    const ws = new WebSocket('ws://localhost:15674/ws');

    const headers = {
      login: 'guest',
      passcode: 'guest',
      durable: false, // Match existing configuration
      'auto-delete': false,
      exclusive: false
    };

    stompClient = Stomp.over(ws);

    stompClient.connect(
      headers,
      (frame) => {
        console.log('Connected to RabbitMQ');
        stompClient.subscribe('/queue/order-queue', (message) => {
          console.log('Received message:', message.body);
          if (onMessageCallback) onMessageCallback(message.body);
        });
      },
      (error) => {
        console.error('STOMP connection error:', error);
      }
    );

    return 'Connecting to RabbitMQ...';
  };

  useEffect(() => {
    const result = connectRabbit();
    setMessage(result);
  }, []);
  const orders = [
    {
      id: 1,
      customerName: "John Doe",
      total: 45.99,
      status: "Pending",
      items: [
        {
          name: "Pasta Primavera",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",

          quantity: 2,
          price: 12.99,
        },
        {
          name: "Garlic Bread",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",

          quantity: 1,
          price: 4.99,
        },
      ],
    },
    {
      id: 2,
      customerName: "Jane Smith",
      total: 29.49,
      status: "Processing",
      items: [
        {
          name: "Caesar Salad",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
          quantity: 1,
          price: 7.49,
        },
        {
          name: "Margherita Pizza",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
          quantity: 1,
          price: 15.0,
        },
      ],
    },
    {
      id: 3,
      customerName: "Tom Brown",
      total: 89.99,
      status: "Completed",
      items: [
        {
          name: "Steak Dinner",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",

          quantity: 2,
          price: 29.99,
        },
        {
          name: "Chocolate Cake",
          image:
            "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
          quantity: 1,
          price: 14.99,
        },
      ],
    },
  ];

  const [orderList, setOrderList] = useState(orders);

  const handleStatusChange = (id, newStatus) => {
    setOrderList((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg">
      <div>
        <h2>RabbitMQ test</h2>
        <h1>{message}</h1>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Orders</h2>
      <div className="space-y-4 max-w-xl mx-auto h-[72vh] overflow-y-auto">
        {orderList.map((order) => (
          <div key={order.id} className="p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  Customer: {order.customerName}
                </p>
                <p className="text-sm text-gray-500">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border border-gray-300 rounded-md p-1"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center border-b pb-2 last:border-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
