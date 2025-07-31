import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Clothing from "./pages/Clothing";
import Furniture from "./pages/Funitures";
import Electronics from "./pages/Electronics";
import Footwear from "./pages/Footwear";
import Utensils from "./pages/Utensils";
import OrphanageDashboard from "./pages/OphanageDashboard";
import OrphanageMessages from "./pages/OrphanageMessages";
import OrphanageReviews from "./pages/orphanagePages/OrphanageReviews";
import OrphanageSettings from "./pages/orphanagePages/OrphanageSettings";
import Cart from "./components/Cart";
import UserDashboard from "./components/User/dashboard";

// New consolidated components
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import DonationForm from "./components/DonationForm";
import Dashboard from "./components/Dashboard";
import OrphanageDetails from "./components/OrphanageDetails";
import BibleVerseScreen from "./components/BibleVerseScreen";
import ApiTest from "./components/ApiTest";
import SimpleLogin from "./components/SimpleLogin";

// Admin Dashboard
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLogin from "./components/Admin/AdminLogin";

import "./assets/globals.css"; // Import global styles

// Main App Content Component that uses AuthContext
function AppContent() {
  const { user, logout } = useAuth();

  // Cart state and handlers
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load cart from localStorage on app start
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Dummy users data - replace with real backend integration later
  const dummyUsers = [
    { id: 1, email: "john@example.com", name: "John Doe", hasAccount: true },
    { id: 2, email: "jane@example.com", name: "Jane Smith", hasAccount: true },
    { id: 3, email: "beiashelimofor@gmail.com", name: "Beia Shelimofor", hasAccount: true },
    // Add more dummy users as needed
  ];

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
    alert(`Added ${product.title} to cart!`);
  };

  const handleRemoveFromCart = (item) => {
    setCartItems((prev) => prev.filter((p) => p !== item));
  };

  const handleCartClick = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to cart first.");
    } else {
      setCartOpen(true);
    }
  };

  // Global profile handling function
  const handleProfileClick = () => {
    // Check if user is logged in
    if (user) {
      // User is logged in, redirect to user dashboard
      window.location.href = "/userDashboard";
    } else {
      // User is not logged in, check if they have an account
      // For demo purposes, we'll simulate checking if user exists
      // In real implementation, this would be handled by your authentication system

      // For now, let's assume if there are dummy users, redirect to login
      // Otherwise redirect to signup
      if (dummyUsers.length > 0) {
        // User has an account, redirect to login
        window.location.href = "/login";
      } else {
        // User doesn't have an account, redirect to signup
        window.location.href = "/signup";
      }
    }
  };

  // Function to handle logout using AuthContext
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Cart is always available */}
      <Cart
        open={cartOpen}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onClose={() => setCartOpen(false)}
        onCheckout={() => alert("Proceeding to checkout...")}
      />

      <Routes>
          <Route
            path="/"
            element={
              <Home
                cartItems={cartItems}
                setCartItems={setCartItems}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                handleCartClick={handleCartClick}
                handleProfileClick={handleProfileClick}
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/clothing"
            element={
              <Clothing
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddToCart={handleAddToCart}
                handleCartClick={handleCartClick}
                handleProfileClick={handleProfileClick}
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/furniture"
            element={
              <Furniture
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddToCart={handleAddToCart}
                handleCartClick={handleCartClick}
                handleProfileClick={handleProfileClick}
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/electronics"
            element={
              <Electronics
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddToCart={handleAddToCart}
                handleCartClick={handleCartClick}
                handleProfileClick={handleProfileClick}
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/footwear"
            element={
              <Footwear
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddToCart={handleAddToCart}
                handleCartClick={handleCartClick}
                handleProfileClick={handleProfileClick}
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route
            path="/utensils"
            element={
              <Utensils
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleAddToCart={handleAddToCart}
                handleCartClick={handleCartClick}
                handleProfileClick={handleProfileClick}
                user={user}
                onLogout={handleLogout}
              />
            }
          />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/OrphanageDashboard" element={<OrphanageDashboard />} />
          <Route path="/OrphanageMessages" element={<OrphanageMessages />} />
          <Route path="/OrphanageReviews" element={<OrphanageReviews />} />
          <Route path="/OrphanageSettings" element={<OrphanageSettings />} />

          {/* New consolidated routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/donate" element={<DonationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orphanage/:id" element={<OrphanageDetails />} />
          <Route path="/bible-verse" element={<BibleVerseScreen />} />
          <Route path="/api-test" element={<ApiTest />} />
          <Route path="/simple-login" element={<SimpleLogin />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    </>
  );
}

// Main App wrapper with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
