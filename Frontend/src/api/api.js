import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const login = (credentials) => axios.post(`${API_URL}/users/login`, credentials);
export const register = (userData) => axios.post(`${API_URL}/users/register`, userData);
export const getInventory = () => axios.get(`${API_URL}/inventory`, getConfig());
export const addItem = (item) => axios.post(`${API_URL}/inventory`, item, getConfig());
export const getRecipes = () => axios.get(`${API_URL}/recipes`, getConfig());
export const generateMeal = (ingredients) => axios.post(`${API_URL}/recipes/magic-meal`, { ingredients }, getConfig());
export const getChores = () => axios.get(`${API_URL}/chores`, getConfig());
export const assignChore = (chore) => axios.post(`${API_URL}/chores`, chore, getConfig());
export const getShoppingList = () => axios.get(`${API_URL}/shopping`, getConfig());
export const updateShoppingList = (list) => axios.post(`${API_URL}/shopping`, list, getConfig());