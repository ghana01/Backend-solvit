import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import MealPlanning from "./pages/MealPlanning";
import Chores from "./pages/Chores";
import ShoppingList from "./pages/ShoppingList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  
                    <Dashboard />
                  
                }
              />
              <Route
                path="/inventory"
                element={
                  
                    <Inventory />
                  
                }
              />
              <Route
                path="/meal-planning"
                element={
                  <ProtectedRoute>
                    <MealPlanning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chores"
                element={
                  <ProtectedRoute>
                    <Chores />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/shopping-list"
                element={
                  <ProtectedRoute>
                    <ShoppingList />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

export default App;