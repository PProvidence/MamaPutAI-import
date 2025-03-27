import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPageLayout from "./components/layouts/LandingPageLayout";
import SettingsLayout from "./components/layouts/SettingsLayout";
import ProfileSettings from "./pages/settings/ProfileSettings";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import DieticianPage from "./pages/DieticianPage";
import FAQs from "./pages/FAQs";
import SignupPage from "./pages/Auth_pages/signup";
import LoginPage from "./pages/Auth_pages/login";
import Onboarding from "./pages/Auth_pages/onboarding";


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPageLayout>
              <Home />
            </LandingPageLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <LandingPageLayout>
              <Pricing />
            </LandingPageLayout>
          }
        />
        <Route
          path="/pricing"
          element={
            <LandingPageLayout>
              <Features />
            </LandingPageLayout>
          }
        />
        <Route
          path="/dietician-page"
          element={
            <LandingPageLayout>
              <DieticianPage />
            </LandingPageLayout>
          }
        />
        <Route
          path="/faqs"
          element={
            <LandingPageLayout>
              <FAQs />
            </LandingPageLayout>
          }
        />
        <Route
          path="/settings/profile"
          element={
            <SettingsLayout>
              <ProfileSettings />
            </SettingsLayout>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}

export default App;