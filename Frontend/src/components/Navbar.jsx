import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          HomeHarmony
        </Link>
        {user ? (
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-white hover:text-gray-200">
              Dashboard
            </Link>
            <Link to="/inventory" className="text-white hover:text-gray-200">
              Inventory
            </Link>
            <Link to="/meal-planning" className="text-white hover:text-gray-200">
              Meal Planning
            </Link>
            <Link to="/chores" className="text-white hover:text-gray-200">
              Chores
            </Link>
            <Link to="/shopping-list" className="text-white hover:text-gray-200">
              Shopping List
            </Link>
            <Link to="/rewards" className="text-white hover:text-gray-200">
              Rewards
            </Link>
            <Link to="/shared-shopping" className="text-white hover:text-gray-200">
              Shared Shopping
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-200">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;