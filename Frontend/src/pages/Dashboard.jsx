import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInventory } from "../api/api";
import { setInventory } from "../redux/inventorySlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const inventory = useSelector((state) => state.inventory.items);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await getInventory();
        dispatch(setInventory(response.data));
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">HomeHarmony Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Inventory Snapshot</h2>
          {inventory.length > 0 ? (
            inventory.slice(0, 3).map((item) => (
              <p key={item._id} className="text-gray-600">
                {item.name} - Expires: {item.expiration}
              </p>
            ))
          ) : (
            <p>No items in inventory</p>
          )}
        </div>
        {/* Add similar sections for chores and meal suggestions */}
      </div>
    </div>
  );
};

export default Dashboard;