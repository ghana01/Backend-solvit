import React, { useEffect, useState } from "react";
import { getShoppingList, updateShoppingList } from "../api/api";

const ShoppingList = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await getShoppingList();
        setList(response.data || []);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };
    fetchList();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    try {
      const updatedList = [...list, { name: newItem, checked: false }];
      await updateShoppingList(updatedList);
      setList(updatedList);
      setNewItem("");
    } catch (error) {
      console.error("Error adding item to shopping list:", error);
    }
  };

  const handleToggleCheck = async (index) => {
    const updatedList = list.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    );
    try {
      await updateShoppingList(updatedList);
      setList(updatedList);
    } catch (error) {
      console.error("Error updating shopping list:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Shopping List</h1>
      <form onSubmit={handleAddItem} className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add item to list"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Add
          </button>
        </div>
      </form>
      <div className="bg-white p-6 rounded-lg shadow">
        {list.length > 0 ? (
          <ul className="space-y-2">
            {list.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-gray-600"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleCheck(index)}
                    className="mr-2"
                  />
                  <span className={item.checked ? "line-through" : ""}>
                    {item.name}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No items in the shopping list yet.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingList;