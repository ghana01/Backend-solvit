import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          HomeHarmony
        </Link>
        <div className="space-x-4">
          <Link to="/inventory" className="hover:underline">
            Inventory
          </Link>
          <Link to="/recipes" className="hover:underline">
            Recipes
          </Link>
          <Link to="/chores" className="hover:underline">
            Chores
          </Link>
          <Link to="/rewards" className="hover:underline">
            Rewards
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;