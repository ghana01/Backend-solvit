import React, { useState, useEffect } from "react";
import { generateMeal } from "../api/api";
import axios from 'axios';

const MealPlanning = () => {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [leftovers, setLeftovers] = useState([]);

  useEffect(() => {
    const fetchLeftovers = async () => {
      try {
        const response = await axios.get('/api/inventory?isLeftover=true');
        setLeftovers(response.data);
      } catch (error) {
        console.error('Error fetching leftovers:', error);
      }
    };
    fetchLeftovers();
  }, []);

  const handleGenerateMeal = async () => {
    try {
      const response = await generateMeal(ingredients.split(","));
      setMeals(response.data);
    } catch (error) {
      console.error("Error generating meal:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Meal Planning</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients (e.g., chicken, rice)"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleGenerateMeal}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Generate Magic Meal
        </button>
        {meals.length > 0 && (
          <ul className="mt-4">
            {meals.map((meal, index) => (
              <li key={index} className="text-gray-600">{meal.name}</li>
            ))}
          </ul>
        )}
        <div>
          <h3>Leftovers</h3>
          <ul>
            {leftovers.map((leftover) => (
              <li key={leftover._id}>{leftover.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MealPlanning;