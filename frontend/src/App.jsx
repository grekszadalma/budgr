import { useState } from 'react'

import './App.css'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Expenses from "./pages/Expenses.jsx";
import Incomes from "./pages/Incomes.jsx";
import Savings from "./pages/Savings.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Dashboard from "./pages/Dashboard.jsx"
import WishListItem from "./pages/WishListItem.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from "./store/store";


const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)
    const isAuthenticated = false;

  return (
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/wishlist/item" element={<WishListItem />} />
          <Route
              path="/dashboard"
              element={
                  <Dashboard />
              }
          />
      </Routes>
      </QueryClientProvider>
      </Provider>
  )
}

export default App
