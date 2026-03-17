import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthCallback from "./pages/AuthCallback";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ResearchCopilot from "./pages/dashboard/ResearchCopilot";
import HypothesisGenerator from "./pages/dashboard/HypothesisGenerator";
import PaperLibrary from "./pages/dashboard/PaperLibrary";
import PaperReader from "./pages/dashboard/PaperReader";
import Simulations from "./pages/dashboard/Simulations";
import Experiments from "./pages/dashboard/Experiments";
import SavedProjects from "./pages/dashboard/SavedProjects";
import Profile from "./pages/dashboard/Profile";
import SettingsPage from "./pages/dashboard/SettingsPage";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import ResponsibleAI from "./pages/legal/ResponsibleAI";
import ResearchEthics from "./pages/legal/ResearchEthics";
import DataUsagePolicy from "./pages/legal/DataUsagePolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/responsible-ai" element={<ResponsibleAI />} />
              <Route path="/research-ethics" element={<ResearchEthics />} />
              <Route path="/data-usage" element={<DataUsagePolicy />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                <Route index element={<DashboardHome />} />
                <Route path="copilot" element={<ResearchCopilot />} />
                <Route path="hypotheses" element={<HypothesisGenerator />} />
                <Route path="papers" element={<PaperLibrary />} />
                <Route path="paper-reader" element={<PaperReader />} />
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
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
