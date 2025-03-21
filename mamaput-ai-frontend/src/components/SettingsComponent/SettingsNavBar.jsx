import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  LayoutDashboard,
  UserRoundPen,
  BookUser,
  LockKeyhole,
  BellRing,
  Cookie,
  ChevronLeft,
  Menu,
} from "lucide-react";

const SettingsNavBar = ({ isCollapsed, setIsCollapsed }) => {
  const [localCollapsed, setLocalCollapsed] = useState(false);
  
  // Sync with parent state if provided
  useEffect(() => {
    if (setIsCollapsed && isCollapsed !== undefined) {
      setLocalCollapsed(isCollapsed);
    }
  }, [isCollapsed, setIsCollapsed]);
  
  const toggleCollapse = () => {
    const newState = !localCollapsed;
    setLocalCollapsed(newState);
    if (setIsCollapsed) {
      setIsCollapsed(newState);
    }
  };

  const NavLinks = [
    { title: "Back to dashboard", link: "/dashboard", icon: LayoutDashboard },
    { title: "Profile Settings", link: "/settings/profile", icon: UserRoundPen },
    { title: "Account Settings", link: "/settings/account", icon: BookUser },
    { title: "Security Settings", link: "/settings/security", icon: LockKeyhole },
    { title: "Notification Settings", link: "/settings/notifications", icon: BellRing },
    { title: "Preferences", link: "/settings/preferences", icon: Cookie },
  ];

  // Determine if we're in mobile view based on parent not providing collapse handlers
  const isMobileView = setIsCollapsed === undefined;

  return (
    <div className="h-full bg-white shadow-xl flex flex-col">
      {/* Header with Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className={`text-2xl font-bold ${localCollapsed && !isMobileView ? "hidden" : "block"}`}>
          MamaPut AI
        </h3>
        
        {/* Only show collapse toggle on desktop */}
        {!isMobileView && (
          <button 
            onClick={toggleCollapse} 
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label={localCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {localCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 overflow-y-auto">
        {/* Full Links with Text (always show on mobile, only when expanded on desktop) */}
        <div className={!isMobileView && localCollapsed ? "hidden" : "flex flex-col gap-3 px-4"}>
          {NavLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.link}
              className={({ isActive }) =>
                `flex items-center text-sm cursor-pointer hover:font-bold text-gray-700 px-4 py-3 gap-3 rounded-lg transition-all ${
                  isActive ? "bg-tertiaryGreen text-[#16A34A]" : "bg-white hover:bg-gray-100"
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              {link.title}
            </NavLink>
          ))}
        </div>

        {/* Icon-only Links for Collapsed State (desktop only) */}
        {!isMobileView && (
          <div className={localCollapsed ? "flex flex-col gap-3 px-2" : "hidden"}>
            {NavLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.link}
                className={({ isActive }) =>
                  `flex justify-center cursor-pointer hover:font-bold text-gray-700 py-3 rounded-lg ${
                    isActive ? "bg-tertiaryGreen text-[#16A34A]" : "bg-white hover:bg-gray-100"
                  }`
                }
                title={link.title}
              >
                <link.icon className="h-5 w-5" />
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SettingsNavBar.propTypes = {
  isCollapsed: PropTypes.bool,
  setIsCollapsed: PropTypes.func
};

export default SettingsNavBar;