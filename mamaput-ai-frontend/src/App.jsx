import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< Updated upstream
import NavBar from "./components/navBar";
=======
import LandingPageLayout from "./components/layouts/LandingPageLayout"; 
import SettingsLayout from "./components/layouts/SettingsLayout";
import ProfileSettings from "./pages/settings/ProfileSettings";
>>>>>>> Stashed changes
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import DieticianPage from "./pages/DieticianPage";
import FAQs from "./pages/FAQs";

function App() {
  return (
<<<<<<< Updated upstream
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dietician-page" element={<DieticianPage />} />
          <Route path="/faqs" element={<FAQs />} />
        </Routes>
      </Router>
    </div>
=======
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageLayout><Home /></LandingPageLayout>} />
        <Route path="/features" element={<LandingPageLayout><Features /></LandingPageLayout>} />
        <Route path="/pricing" element={<LandingPageLayout><Pricing /></LandingPageLayout>} />
        <Route path="/dietician-page" element={<LandingPageLayout><DieticianPage /></LandingPageLayout>} />
        <Route path="/faqs" element={<LandingPageLayout><FAQs /></LandingPageLayout>} />
        <Route path="/settings/profile" element={<SettingsLayout><ProfileSettings/></SettingsLayout>} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  );
}

export default App;
