"use client";
import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import { baseApi } from "../constants/api";
import axios from "axios";

const AdminOrders = () => {
  // Temporarily putting code here for easy reference
  const [message, setMessage] = useState("");
  const [orderList, setOrderList] = useState();

  const parseToJsonArray = (input) => {
    const trimmedString = input.slice(1, -1); // Remove the square brackets
    const records = trimmedString.split(", Id = ").map((record, index) => {
      return index === 0 ? record : "Id = " + record; // Add "Id = " back to subsequent records
    });

    return records.map((record) => {
      const obj = {};
      record.split("&").forEach((pair) => {
        const [key, value] = pair.split("=").map((str) => str.trim());
        obj[key] = value;
      });
      return obj;
    });
  };

  // Function to group items by `Id`
  const groupById = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.Id]) {
        acc[item.Id] = {
          Id: item.Id,
          totalQuantity: 0,
          totalPrice: 0,
          items: [],
        };
      }
      acc[item.Id].totalQuantity += parseInt(item.quantity);
      acc[item.Id].totalPrice +=
        parseFloat(item.price) * parseInt(item.quantity);
      acc[item.Id].items.push(item);
      return acc;
    }, {});
  };

  const connectRabbit = async (onMessageCallback) => {
    let stompClient;

    const ws = new WebSocket("ws://localhost:15674/ws");

    const headers = {
      login: "guest",
      passcode: "guest",
      durable: false, // Match existing configuration
      "auto-delete": false,
      exclusive: false,
    };

    stompClient = Stomp.over(ws);

    await stompClient.connect(
      headers,
      (frame) => {
        console.log("Connected to RabbitMQ");
        stompClient.subscribe("/queue/order-queue", (message) => {
          console.log("Received message:", message.body);
          const parseditems = parseToJsonArray(message.body);
          // const filteredItems = parseditems.filter((item) => item.Id);
          const groupedItems = groupById(parseditems)
          setOrderList(groupedItems);
          if (onMessageCallback) onMessageCallback(message.body);
        });
      },
      (error) => {
        console.error("STOMP connection error:", error);
      }
    );
          

    return "Connecting to RabbitMQ...";
  };

  useEffect(() => {
    const result =  connectRabbit();
    setMessage(result);
    
  }, []);

  useEffect(() => {
    // This will be called whenever orderList updates
    console.log("calling")
    if (orderList) {
      console.log("Updated order list:", orderList);
    }
  }, [orderList]);

  // const orders = async () => {
  //   try {
  //     const data = await axios.post(`${baseApi}/checkoutItems/add`);
  //     // setOrderId(data.orderId);
  //     console.log(data.data.items);
  //   } catch (e) {
  //     console.log(e);
  //     // alert("Checkout failed. Please try again.");
  //   }
  // };
  // useEffect(() => {
  //   orders();
  // }, []);

  // const [orderList, setOrderList] = useState(orders);

  const handleStatusChange = async (id, newStatus) => {
    const data = await axios.post(
      `${baseApi}/checkoutItems/updateStatus`,
      null,
      {
        params: { orderId: id, status: newStatus.toUpperCase() },
      }
    );

    // setOrderList((prevOrders) =>
    //   prevOrders.map((order) =>
    //     order.id === id ? { ...order, status: newStatus } : order
    //   )
    // );
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Orders</h2>
      <div className="space-y-4 max-w-xl mx-auto h-[72vh] overflow-y-auto text-sm">
        {orderList &&
          Object.values(orderList).map((order,id) => (
            <div key={id} className="p-4 bg-white rounded-md shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold">Order #{order.Id}</h3>
                  <p className="text-sm text-gray-500">{order.Name}</p>
                  <p className="text-sm text-gray-500">
                    Total Quantity: {order.totalQuantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Price: ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.Id, e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value="New">New</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b pb-2 last:border-none"
                  >
                    <img
                      src={item.imageURL}
                      alt={item.Name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold">{item.Name}</h4>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Price: ${(item.price * item.quantity).toFixed(2)}
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
