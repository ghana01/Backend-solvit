import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import VoiceInput from "../components/VoiceInput";
import BarcodeScanner from "../components/BarcodeScanner";
import { addItem, scanQRCode, addItemViaVoice } from "../api/api";
import { setInventory } from "../redux/inventorySlice";
import axios from 'axios';

const Inventory = () => {
  const dispatch = useDispatch();
  const [item, setItem] = useState({ name: "", expiration: "", barcode: "" });
  const [leftoverName, setLeftoverName] = useState("");
  const [barcode, setBarcode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addItem(item);
      dispatch(setInventory(response.data));
      setItem({ name: "", expiration: "", barcode: "" });
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleVoiceInput = async (transcript) => {
    try {
      const response = await addItemViaVoice({ audio: transcript });
      dispatch(setInventory(response.data));
      setItem({ name: "", expiration: "", barcode: "" });
    } catch (error) {
      console.error("Error processing voice input:", error);
    }
  };

  const handleBarcodeScan = async (barcode) => {
    try {
      const response = await scanQRCode({ barcode });
      dispatch(setInventory(response.data));
      setItem({ name: "", expiration: "", barcode: "" });
    } catch (error) {
      console.error("Error processing barcode:", error);
    }
  };

  const handleAddLeftover = async () => {
    try {
      const response = await axios.post('/api/inventory/leftovers', { name: leftoverName });
      setInventory([...inventory, response.data]);
    } catch (error) {
      console.error('Error adding leftover:', error);
    }
  };

  const handleBarcodeLookup = async () => {
    try {
      const response = await axios.get(`/api/inventory/barcode/${barcode}`);
      alert(`Item: ${response.data.description}`);
    } catch (error) {
      console.error('Error fetching barcode data:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Inventory</h1>
      
      <div className="flex space-x-4 mb-6">
        <VoiceInput onVoiceInput={handleVoiceInput} />
        <BarcodeScanner onScan={handleBarcodeScan} />
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Expiration Date</label>
          <input
            type="date"
            value={item.expiration}
            onChange={(e) => setItem({ ...item, expiration: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Barcode</label>
          <input
            type="text"
            value={item.barcode}
            onChange={(e) => setItem({ ...item, barcode: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Item
        </button>
      </form>

      <div>
        <h3>Add Leftover</h3>
        <input
          type="text"
          value={leftoverName}
          onChange={(e) => setLeftoverName(e.target.value)}
          placeholder="Enter leftover name"
        />
        <button onClick={handleAddLeftover}>Add Leftover</button>
      </div>
      <div>
        <h3>Scan Barcode</h3>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter barcode"
        />
        <button onClick={handleBarcodeLookup}>Lookup Barcode</button>
      </div>
    </div>
  );
};

export default Inventory;