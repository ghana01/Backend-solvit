import React, { useState } from 'react';
import { scanQRCode, addItemViaVoice } from '../services/inventoryService';

const Inventory = () => {
  const [barcode, setBarcode] = useState('');
  const [audio, setAudio] = useState('');

  const handleBarcodeSubmit = async () => {
    try {
      const item = await scanQRCode({ barcode });
      alert(`Item added: ${item.name}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVoiceSubmit = async () => {
    try {
      const { item } = await addItemViaVoice({ audio });
      alert(`Item added: ${item.name}`);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Inventory</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleBarcodeSubmit} className="bg-blue-500 text-white p-2 rounded">
          Scan Barcode
        </button>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudio(e.target.files[0])}
          className="w-full p-2 border rounded"
        />
        <button onClick={handleVoiceSubmit} className="bg-blue-500 text-white p-2 rounded">
          Add via Voice
        </button>
      </div>
    </div>
  );
};

export default Inventory;