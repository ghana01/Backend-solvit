import React, { useState } from 'react';
import { getMagicMeals } from '../services/recipeService';

const Recipes = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async () => {
    try {
      const recipes = await getMagicMeals({ ingredients: ingredients.split(',') });
      setRecipes(recipes);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recipes</h2>
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
        Generate Recipes
      </button>
      <div className="mt-6 space-y-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{recipe.name}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;