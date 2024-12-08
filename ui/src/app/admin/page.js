"use client";
import { useState, useEffect } from "react";
import { baseApi } from "../constants/api";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("add");
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    prepTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch menu items
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenuItems();
        setMenuItems(data);
      } catch (err) {
        setError("Failed to fetch menu items");
      }
    };
    fetchData();
  }, []);

  const addMenuItem = async (menuItem) => {
    const response = await axios.post(`${baseApi}/menu/add`, menuItem);
    return response.data;
  };

  const getMenuItems = async () => {
    const response = await axios.get(`${baseApi}/menus/items`);
    return response.data;
  };

  const deleteMenuItem = async (id) => {
    const response = await axios.delete(`${baseApi}/menu/remove`, {
      params: { Id: id },
    });
    return response.data;
  };

  // Handle Add Menu Item
  const handleAdd = async () => {
    try {
      setLoading(true);
      
      await addMenuItem(newItem);
      const updatedItems = await getMenuItems();
      setMenuItems(updatedItems);
      toast.success("Menu item added successfully");
      setNewItem({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        prepTime: "",
      });
      setLoading(false);

    } catch (err) {
      setError("Failed to add menu item");
      setLoading(false);
    }
  };

  // Handle Delete Menu Item
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteMenuItem(id);
      const updatedItems = await getMenuItems();
      setMenuItems(updatedItems);
      toast.success("Deleted item added successfully");

      setLoading(false);
    } catch (err) {
      setError("Failed to delete menu item");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen ">
      {/* Tab Navigation */}
      <div className="flex items-center justify-center ">
        <button
          className={`px-4 py-2 ${
            activeTab === "add" ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Menu Item
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "display"
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab("display")}
        >
          Manage Menu Items
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "add" && (
          <div className="mx-auto w-[350px] rounded shadow-lg">
            <form
              className="mx-auto p-4 text-sm"
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              <div className="flex flex-col gap-6">
                <div className="w-full">
                  <p>Name</p>
                  <input
                    type="text"
                    className="border py-1.5 px-2 mt-1 rounded w-full"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <p>Description</p>
                  <input
                    type="text"
                    className="border py-1.5 px-2 mt-1 rounded w-full"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <p>Price</p>
                  <input
                    type="number"
                    className="border py-1.5 px-2 mt-1 rounded w-full"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <p>Image Url</p>
                  <input
                    type="url"
                    className="border py-1.5 px-2 mt-1 rounded w-full"
                    value={newItem.imageUrl}
                    onChange={(e) =>
                      setNewItem({ ...newItem, imageUrl: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <p>Prep Time</p>
                  <input
                    type="number"
                    className="border py-1.5 px-2 mt-1 rounded w-full"
                    placeholder="minutes"
                    value={newItem.prepTime}
                    onChange={(e) =>
                      setNewItem({ ...newItem, prepTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="mx-auto text-center mt-2 mb-2">
                <button
                  type="submit "
                  className="mt-4  bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {loading ? "Adding..." : "Add Menu Item"}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "display" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Menu Items</h2>
            {error && <p className="text-red-500">{error}</p>}
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Prep Time</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.description}</td>
                    <td className="border px-4 py-2">${item.price}</td>
                    <td className="border px-4 py-2">{item.prepTime} min</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
