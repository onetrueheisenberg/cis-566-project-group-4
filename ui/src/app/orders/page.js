// "use client";
// import React, { useEffect, useState } from "react";
// import Stomp from "stompjs";
// import { baseApi } from "../constants/api";
// import axios from "axios";

// const AdminOrders = () => {
//   // Temporarily putting code here for easy reference
//   const [message, setMessage] = useState("");
//   const [orderList, setOrderList] = useState([]);

//   const connectRabbit = async (onMessageCallback) => {
//     let stompClient;

//     const ws = new WebSocket("ws://localhost:15674/ws");

//     const headers = {
//       login: "guest",
//       passcode: "guest",
//       durable: false, // Match existing configuration
//       "auto-delete": false,
//       exclusive: false,
//     };

//     stompClient = Stomp.over(ws);

//     await stompClient.connect(
//       headers,
//       (frame) => {
//         console.log("Connected to RabbitMQ");
//         stompClient.subscribe("/queue/order-queue", async (message) => {
//           // // const trimmedString = message.body.replace(/\\/g, '');
//           // console.log("Received message:", JSON.parse(message.body));
//           // // const parseditems = await parseToJsonArray(message.body);
//           // // const groupedItems = await groupById(parseditems)
//           // // const filteredItems = parseditems.filter((item) => item.Id !== undefined);
//           // setOrderList(JSON.parse(message.body));
//           // if (onMessageCallback) onMessageCallback(message.body);
//           console.log("Received raw message:", message.body);
//           try {
//             const parsedData = JSON.parse(message.body);
//             console.log("Parsed data:", parsedData); // Log the parsed data
//             setOrderList(parsedData);  // Ensure that this is an array
//           } catch (error) {
//             console.error("Error parsing message:", error);
//           }
//         });
//       },
//       (error) => {
//         console.error("STOMP connection error:", error);
//       }
//     );


//     return "Connecting to RabbitMQ...";
//   };
//   useEffect(() => {
//     console.log(orderList);
//   }, [orderList])

//   useEffect(() => {
//     const result = connectRabbit();
//     setMessage(result);

//   }, []);

//   useEffect(() => {
//     // This will be called whenever orderList updates
//     console.log("calling")
//     if (orderList) {
//       console.log("Updated order list:", orderList);
//     }
//   }, [orderList]);

//   // const orders = async () => {
//   //   try {
//   //     const data = await axios.post(`${baseApi}/checkoutItems/add`);
//   //     // setOrderId(data.orderId);
//   //     console.log(data.data.items);
//   //   } catch (e) {
//   //     console.log(e);
//   //     // alert("Checkout failed. Please try again.");
//   //   }
//   // };
//   // useEffect(() => {
//   //   orders();
//   // }, []);

//   // const [orderList, setOrderList] = useState(orders);

//   const handleStatusChange = async (id, newStatus) => {
//     const data = await axios.post(
//       `${baseApi}/checkoutItems/updateStatus`,
//       null,
//       {
//         params: { orderId: id, status: newStatus.toUpperCase() },
//       }
//     );

//     // setOrderList((prevOrders) =>
//     //   prevOrders.map((order) =>
//     //     order.id === id ? { ...order, status: newStatus } : order
//     //   )
//     // );
//   };

//   return (
//     <div className="p-6 bg-gray-100 shadow-md rounded-lg min-h-screen">
//       <h2 className="text-xl font-bold mb-4 text-center">Manage Orders</h2>
//       <div className="space-y-4 max-w-xl mx-auto h-[72vh] overflow-y-auto text-sm">
//         {orderList &&
//           orderList.map((order, id) => (
//             <div key={id} className="p-4 bg-white rounded-md shadow-md">
//               <div className="flex justify-between items-center mb-2">
//                 <div>
//                   <h3 className="font-semibold">Order #{order.Id}</h3>
//                   <p className="text-sm text-gray-500">{order.Name}</p>
//                   <p className="text-sm text-gray-500">
//                     Total Quantity: {order.totalQuantity}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     Total Price: ${order.totalPrice}
//                   </p>
//                 </div>
//                 <select
//                   value={order.status}
//                   onChange={(e) => handleStatusChange(order.Id, e.target.value)}
//                   className="border border-gray-300 rounded-md p-1"
//                 >
//                   <option value="New">New</option>
//                   <option value="Processing">Processing</option>
//                   <option value="Completed">Completed</option>
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 {order.items.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center border-b pb-2 last:border-none"
//                   >
//                     <img
//                       src={item.imageURL}
//                       alt={item.Name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                     <div className="ml-4">
//                       <h4 className="text-sm font-semibold">{item.Name}</h4>
//                       <p className="text-xs text-gray-500">
//                         Quantity: {item.quantity}
//                       </p>
//                       <p className="text-xs text-gray-500">
//                         Price: ${(item.price * item.quantity)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default AdminOrders;


"use client";
import React, { useEffect, useState } from "react";
import Stomp from "stompjs";
import { baseApi } from "../constants/api";
import axios from "axios";

const AdminOrders = () => {
  const [message, setMessage] = useState("");
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    console.log("Updated orderList:", orderList);
  }, [orderList]); // Logs whenever orderList updates

  const connectRabbit = async () => {
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
        stompClient.subscribe("/queue/order-queue", async (message) => {
          console.log("Received raw message:", message.body);

          try {
            let parsedData = JSON.parse(message.body);
            console.log("Parsed data:", parsedData);

            // Ensure parsedData is an array
            if (!Array.isArray(parsedData)) {
              parsedData = [parsedData]; // Wrap in an array if it's not already
              console.log("Wrapped data in array:", parsedData);
            }

            setOrderList(parsedData);
          } catch (error) {
            console.error("Error parsing message:", error);
          }
        });
      },
      (error) => {
        console.error("STOMP connection error:", error);
      }
    );
  };

  useEffect(() => {
    connectRabbit(); // Establish WebSocket connection
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const data = await axios.post(
      `${baseApi}/checkoutItems/updateStatus`,
      null,
      {
        params: { orderId: id, status: newStatus.toUpperCase() },
      }
    );

    // Optionally update the state after the status change
    setOrderList((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 shadow-md rounded-lg min-h-screen">
      <h2 className="text-xl font-bold mb-4 text-center">Manage Orders</h2>
      <div className="space-y-4 max-w-xl mx-auto h-[72vh] overflow-y-auto text-sm">
        {orderList.length > 0 ? (
          orderList.map((order, id) => (
            <div key={id} className="p-4 bg-white rounded-md shadow-md">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold">Order #{order.orderId}</h3>
                  <p className="text-sm text-gray-500">{order.name}</p>
                  <p className="text-sm text-gray-500">
                    Total Quantity: {order.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Total Price: ${(order.price * order.quantity).toFixed(2)}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value="NEW">New</option>
                  <option value="PROCESSING">Processing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="flex items-center border-b pb-2 last:border-none">
                  <img
                    src={order.imageUrl || "/path/to/default/image.jpg"}
                    alt={order.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h4 className="text-sm font-semibold">{order.name}</h4>
                    <p className="text-xs text-gray-500">
                      Quantity: {order.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      Price: ${(order.price * order.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
