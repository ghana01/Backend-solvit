import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rewards';

export const getRewards = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};