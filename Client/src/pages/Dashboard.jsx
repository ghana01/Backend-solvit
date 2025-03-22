import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/inventory" className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Inventory</h2>
          <p className="text-gray-600">Manage groceries and household supplies.</p>
        </Link>
        <Link to="/recipes" className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Recipes</h2>
          <p className="text-gray-600">Plan meals and discover new recipes.</p>
        </Link>
        <Link to="/chores" className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Chores</h2>
          <p className="text-gray-600">Assign and track household tasks.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;