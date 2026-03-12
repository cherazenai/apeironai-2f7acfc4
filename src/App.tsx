import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import ResearchCopilot from "./pages/dashboard/ResearchCopilot.tsx";
import HypothesisGenerator from "./pages/dashboard/HypothesisGenerator.tsx";
import PaperLibrary from "./pages/dashboard/PaperLibrary.tsx";
import Simulations from "./pages/dashboard/Simulations.tsx";
import Experiments from "./pages/dashboard/Experiments.tsx";
import SavedProjects from "./pages/dashboard/SavedProjects.tsx";
import Profile from "./pages/dashboard/Profile.tsx";
import SettingsPage from "./pages/dashboard/SettingsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="copilot" element={<ResearchCopilot />} />
            <Route path="hypotheses" element={<HypothesisGenerator />} />
            <Route path="papers" element={<PaperLibrary />} />
            <Route path="simulations" element={<Simulations />} />
            <Route path="experiments" element={<Experiments />} />
            <Route path="projects" element={<SavedProjects />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
