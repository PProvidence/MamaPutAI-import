import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LayoutDashboard, CalendarCheck, History, MessageSquareWarning, Menu, ChevronLeft } from 'lucide-react';
import { BiFoodMenu } from "react-icons/bi";
import { RiHeartAdd2Line } from "react-icons/ri";

const SideNavbar = ({ isCollapsed, setIsCollapsed }) => {
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
        { title: 'Dashboard', link: '/dashboard', icon: LayoutDashboard },
        { title: 'Meal Plans', link: '/meal-plans', icon: BiFoodMenu },
        { title: 'Nutrition Tracker', link: '/nutrition-tracker', icon: RiHeartAdd2Line },
        { title: 'Reminders', link: '/reminders', icon: CalendarCheck },
        { title: 'History', link: '/history', icon: History },
        { title: 'Feedback', link: '/feedback', icon: MessageSquareWarning },
    ];

    // Determine if we're in mobile view based on parent not providing collapse handlers
    const isMobileView = setIsCollapsed === undefined;

    return (
        <div className="h-full bg-white shadow-xl flex flex-col">
            {/* Header with Logo and Toggle */}
            <div className="flex items-center justify-between p-4 border-b-2 border-pricingGreen">
                <h2 className={`text-2xl font-bold ${localCollapsed && !isMobileView ? "hidden" : "block"}`}>
                    MamaPut AI
                </h2>

                {/* Only show collapse toggle on desktop */}
                {!isMobileView && (
                    <button 
                        onClick={toggleCollapse} 
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label={localCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {localCollapsed ? <Menu className="h-5 w-5 hover:text-pryGreen hover:cursor-pointer" /> : <ChevronLeft className="h-5 w-5 hover:text-pryGreen hover:cursor-pointer" />}
                    </button>
                )}
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 overflow-y-auto">
                {/* Full Links with Text (always show on mobile, only when expanded on desktop) */}
                <ul className={!isMobileView && localCollapsed ? "hidden" : "flex flex-col gap-3 px-0.5"}>
                    {NavLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.link} className={({ isActive }) => 
                                `flex items-center py-3 px-4 text-sm cursor-pointer text-gray-700 font-medium gap-3 transition-all hover:text-pryGreen hover:font-bold 
                                ${isActive ? "bg-tertiaryGreen text-pryGreen border-l-pryGreen border-l-4 rounded-xs" : "bg-white hover:bg-gray-100"}`
                            }>
                                <link.icon className="h-5 w-5" />
                                {link.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Icons-only Links for Collapsed State (desktop only) */}
                {!isMobileView && (
                    <ul className={localCollapsed ? "flex flex-col gap-3 px-2" : "hidden"}>
                        {NavLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink to={link.link} className={({ isActive }) => 
                                    `flex justify-center items-center py-3 text-sm cursor-pointer text-gray-700 hover:text-pryGreen hover:font-bold rounded-lg 
                                    ${isActive ? "bg-tertiaryGreen text-pryGreen border-l-pryGreen" : "bg-white hover:bg-gray-100"}`
                                } title={link.title}>
                                    <link.icon className="h-5 w-5" />
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

SideNavbar.propTypes = {
    isCollapsed: PropTypes.bool,
    setIsCollapsed: PropTypes.func,
};

export default SideNavbar;
