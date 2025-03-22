import axios from 'axios';

const API_URL = 'http://localhost:5000/api/inventory';

export const scanQRCode = async (barcodeData) => {
  const response = await axios.post(`${API_URL}/scan`, barcodeData);
  return response.data;
};

export const addItemViaVoice = async (audioData) => {
  const response = await axios.post(`${API_URL}/voice`, audioData);
  return response.data;
};