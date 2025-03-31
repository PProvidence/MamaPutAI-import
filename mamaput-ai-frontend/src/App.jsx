import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/userSettingsSlice";

import LandingPageLayout from "./components/layouts/LandingPageLayout";
import SettingsLayout from "./components/layouts/SettingsLayout";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import Preferences from "./pages/settings/Preferences";
import NotificationSettings from "./pages/settings/NotificationSettings";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import DieticianPage from "./pages/DieticianPage";
import FAQs from "./pages/FAQs";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails()); // Automatically fetch user details on app start
  }, [dispatch]);

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
        <Route
          path="/settings/account"
          element={
            <SettingsLayout>
              <AccountSettings />
            </SettingsLayout>
          }
        />
        <Route
          path="/settings/preferences"
          element={
            <SettingsLayout>
              <Preferences />
            </SettingsLayout>
          }
        />
        <Route
          path="/settings/notifications"
          element={
            <SettingsLayout>
              <NotificationSettings />
            </SettingsLayout>
          }
        />
   
      </Routes>
    </Router>
  );
}

export default App;
