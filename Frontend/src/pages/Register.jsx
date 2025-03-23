import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../api/api";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(userData);
      dispatch(setUser({ user: response.data.user, token: response.data.token }));
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Register</h1>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="Name"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          placeholder="Email"
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          placeholder="Password"
          className="w-full p-2 border rounded mb-4"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;