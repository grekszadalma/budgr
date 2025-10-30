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
import Budget from "./pages/./Budget.jsx";
import {createTheme, ThemeProvider} from "@mui/material";

import { AuthProvider } from "./AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const theme = createTheme({
    palette: {
        background: {
            default: "pink",
        },
    },
});

const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0)
    const isAuthenticated = false;

  return (
      <ThemeProvider theme={theme}>
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/expenses" element={
              <ProtectedRoute>
              <Expenses />
              </ProtectedRoute>
          } />
          <Route path="/incomes" element={
              <ProtectedRoute>
              <Incomes />
              </ProtectedRoute>
          } />
          <Route path="/budget" element={
              <ProtectedRoute>
              <Budget />
              </ProtectedRoute>
          } />
          <Route path="/savings" element={
              <ProtectedRoute>
              <Savings />

              </ProtectedRoute>
          } />
          <Route path="/wishlist" element={
              <ProtectedRoute>
              <Wishlist />
                  </ProtectedRoute>
              }
          />
          <Route path="/wishlist/item" element={
              <ProtectedRoute>
              <WishListItem />
                  </ProtectedRoute>
          } />

          <Route
              path="/dashboard"
              element={
                  <ProtectedRoute>
                  <Dashboard />
                  </ProtectedRoute>
              }
          />

      </Routes>
          </AuthProvider>
      </QueryClientProvider>
      </Provider>
      </ThemeProvider>
  )
}

export default App
