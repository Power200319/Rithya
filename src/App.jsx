import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "./components/ui/Tooltip";

// Lazy load pages
const Index = lazy(() => import("./page/index"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {/* Wrap routes in Suspense to support lazy loading */}
          <Suspense fallback={<div className="text-center p-6">កំពុងផ្ទុក...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Add more lazy routes here if needed */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
