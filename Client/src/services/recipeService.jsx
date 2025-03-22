
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recipes';

export const getMagicMeals = async (ingredients) => {
  const response = await axios.post(`${API_URL}/magic-meals`, ingredients);
  return response.data;
};