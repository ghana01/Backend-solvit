import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chores';

export const assignChore = async (choreData) => {
  const response = await axios.post(`${API_URL}/assign`, choreData);
  return response.data;
};

export const completeChore = async (choreId, userId) => {
  const response = await axios.post(`${API_URL}/complete`, { choreId, userId });
  return response.data;
};