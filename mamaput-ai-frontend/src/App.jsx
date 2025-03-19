import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPageLayout from "./components/LandingPageLayout"; // Capitalized
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import DieticianPage from "./pages/DieticianPage";
import FAQs from "./pages/FAQs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageLayout><Home /></LandingPageLayout>} />
        <Route path="/features" element={<LandingPageLayout><Features /></LandingPageLayout>} />
        <Route path="/pricing" element={<LandingPageLayout><Pricing /></LandingPageLayout>} />
        <Route path="/dietician-page" element={<LandingPageLayout><DieticianPage /></LandingPageLayout>} />
        <Route path="/faqs" element={<LandingPageLayout><FAQs /></LandingPageLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
