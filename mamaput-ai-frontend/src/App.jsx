import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "../redux/userSettingsSlice";

// Layouts
import LandingPageLayout from "./components/layouts/LandingPageLayout";
import SettingsLayout from "./components/layouts/SettingsLayout";
import MainDashboardLayout from "./components/layouts/MainDashboardLayout";

//Pages
import NutritionDetailComponent from "./components/MainDashboardComponents/NutritionDetailComponent";
import ProfileSettings from "./pages/settings/ProfileSettings";
import AccountSettings from "./pages/settings/AccountSettings";
import Preferences from "./pages/settings/Preferences";
import NotificationSettings from "./pages/settings/NotificationSettings";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import DieticianPage from "./pages/DieticianPage";
import FAQs from "./pages/FAQs";
import SignupPage from "./pages/Auth_pages/signup";
import LoginPage from "./pages/Auth_pages/login";
import Onboarding from "./pages/Auth_pages/onboarding";
import Dashboard from "./pages/MainDashboard/Dashboard";
import NotificationsPage from "./pages/MainDashboard/Notifications";
import MealPlans from "./pages/MainDashboard/MealPlans";
import NutritionTracker from "./pages/MainDashboard/NutriTracker";
import Reminders from "./pages/MainDashboard/Reminder";
import History from "./pages/MainDashboard/History";
import Feedback from "./pages/MainDashboard/Feedback";
import EmailVerifiedScreen from "./pages/Auth_pages/emailverified";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails());
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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/emailverified" element={ <EmailVerifiedScreen/>} />
        <Route
          path="/pricing"
          element={
            <LandingPageLayout>
              <Pricing />
            </LandingPageLayout>
          }
        />
        <Route
          path="/features"
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
        <Route
          path="/settings/profile"
          element={
            <SettingsLayout>
              <ProfileSettings />
            </SettingsLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <MainDashboardLayout>
              <Dashboard />
            </MainDashboardLayout>
          }
        />
        <Route
          path="/dashboard/notifications"
          element={
            <MainDashboardLayout>
              <NotificationsPage />
            </MainDashboardLayout>
          }
        />
        <Route
          path="/meal-plans"
          element={
            <MainDashboardLayout>
              <MealPlans />
            </MainDashboardLayout>
          }
        />
        <Route
          path="/nutrition-tracker"
          element={
            <MainDashboardLayout>
              <NutritionTracker />
            </MainDashboardLayout>
          }
        />

        <Route
          path="/nutrition-tracker/:nutrient"
          element={
            <MainDashboardLayout>
              <NutritionDetailComponent />
            </MainDashboardLayout>
          }
        />

        <Route
          path="/reminders"
          element={
            <MainDashboardLayout>
              <Reminders />
            </MainDashboardLayout>
          }
        />
        <Route
          path="/history"
          element={
            <MainDashboardLayout>
              <History />
            </MainDashboardLayout>
          }
        />
        <Route
          path="/feedback"
          element={
            <MainDashboardLayout>
              <Feedback />
            </MainDashboardLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
