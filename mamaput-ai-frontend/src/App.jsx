import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import DieticianPage from "./pages/DieticianPage";
import FAQs from "./pages/FAQs";

function App() {
  return (
    <div className="">
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
  );
}

export default App;
