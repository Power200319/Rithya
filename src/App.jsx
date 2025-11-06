import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/Tooltip";

// Lazy load pages
const Index = lazy(() => import("./page/index"));
const AdminPanel = lazy(() => import("./components/AdminPanel"));

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);

  // Check if user is already logged in on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {/* Wrap routes in Suspense to support lazy loading */}
          <Suspense fallback={<div className="text-center p-6">កំពុងផ្ទុក...</div>}>
            <Routes>
              <Route path="/" element={<Index user={user} onLogout={handleLogout} onLogin={handleLogin} />} />
              <Route path="/admin" element={<AdminPanel user={user} onLogout={handleLogout} />} />
              {/* Add more lazy routes here if needed */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
