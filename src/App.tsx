import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ReservationProvider } from "@/contexts/ReservationContext";
import Index from "./pages/Index";
import Reservations from "./pages/Reservations";
import RoomDetails from "./pages/RoomDetails";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ReservationProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/room/:id" element={<RoomDetails />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ReservationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;