import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Navbar } from "./components/layout/Navbar";
import DesignSystemLanding from "./pages/DesignSystemLanding";
import GettingStartedHome from "./pages/getting-started/GettingStartedHome";
import GettingStartedSetup from "./pages/getting-started/GettingStartedSetup";
import LearnTheBasics from "./pages/getting-started/LearnTheBasics";
import ColorPage from "./pages/foundations/ColorPage";
import TypographyPage from "./pages/foundations/TypographyPage";
import SpacingPage from "./pages/foundations/SpacingPage";
import RadiusPage from "./pages/foundations/RadiusPage";
import ElevationPage from "./pages/foundations/ElevationPage";
import TokenOverviewPage from "./pages/foundations/tokens/TokenOverviewPage";
import TokenBuilderPage from "./pages/foundations/tokens/TokenBuilderPage";
import TokenSpecificationsPage from "./pages/foundations/tokens/TokenSpecificationsPage";
import TokenUsagePage from "./pages/foundations/tokens/TokenUsagePage";
import TaxonGlossaryPage from "./pages/foundations/tokens/TaxonGlossaryPage";
import ButtonPage from "./pages/components/ButtonPage";
import CheckboxPage from "./pages/components/CheckboxPage";
import InputPage from "./pages/components/InputPage";
import RadioPage from "./pages/components/RadioPage";
import SelectPage from "./pages/components/SelectPage";
import SwitchPage from "./pages/components/SwitchPage";
import TextareaPage from "./pages/components/TextareaPage";
import ColorGeneratorPage from "./pages/ColorGeneratorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Main landing page */}
            <Route path="/" element={<DesignSystemLanding />} />
            
            {/* Design System routes */}
            <Route path="/design-system" element={<Navigate to="/" replace />} />
            <Route path="/getting-started" element={<GettingStartedHome />} />
            <Route path="/getting-started/setup" element={<GettingStartedSetup />} />
            <Route path="/getting-started/learn" element={<LearnTheBasics />} />
            <Route path="/foundations/color" element={<ColorPage />} />
            <Route path="/foundations/typography" element={<TypographyPage />} />
            <Route path="/foundations/spacing" element={<SpacingPage />} />
            <Route path="/foundations/radius" element={<RadiusPage />} />
            <Route path="/foundations/elevation" element={<ElevationPage />} />
            <Route path="/color-generator" element={<ColorGeneratorPage />} />
            <Route path="/foundations/tokens/overview" element={<TokenOverviewPage />} />
            <Route path="/foundations/tokens/builder" element={<TokenBuilderPage />} />
            <Route path="/foundations/tokens/specifications" element={<TokenSpecificationsPage />} />
            <Route path="/foundations/tokens/usage" element={<TokenUsagePage />} />
            <Route path="/foundations/tokens/glossary" element={<TaxonGlossaryPage />} />
            <Route path="/components/button" element={<ButtonPage />} />
            <Route path="/components/checkbox" element={<CheckboxPage />} />
            <Route path="/components/input" element={<InputPage />} />
            <Route path="/components/radio" element={<RadioPage />} />
            <Route path="/components/select" element={<SelectPage />} />
            <Route path="/components/switch" element={<SwitchPage />} />
            <Route path="/components/textarea" element={<TextareaPage />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
