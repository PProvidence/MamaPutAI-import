import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import SideNavbar from "../MainDashboardComponents/SideNavbar";
import { useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/authclient";

const MainDashboardLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // ✅ Improved authentication check
  useEffect(() => {
    async function fetchSession() {
      try {
        const { data, error } = await authClient.getSession();
        console.log("Session Response:", data);

        if (error) {
          navigate("/");
        }
        // Check if session and session.data exist
        if (!data) {
          navigate("/"); // Redirect to login
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    }
    fetchSession();
  }, [navigate]);

  // ✅ Display loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-16" : "w-64"
        }`}
      >
        <SideNavbar
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-[#16A34A] opacity-75 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-30 transition-all duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-3/4 max-w-xs`}
      >
        <div className="h-full relative">
          <button
            className="absolute right-4 top-4 z-10 p-1 rounded-full bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <SideNavbar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md bg-gray-100"
            aria-label="Open dashboard menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
};

MainDashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainDashboardLayout;
