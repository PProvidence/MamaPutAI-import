import { useState } from "react";
import { Link } from "react-router-dom";
import { XMarkIcon, Bars3CenterLeftIcon } from "@heroicons/react/24/solid";
import logo from "../assets/img/mamaput-ai-logo-bold.png"; 

const NavBar = () => {
  // NavLinks
  const navLinks = [
    { name: "Home", link: "/" },
    { name: "Features", link: "/features" },
    { name: "Pricing", link: "/pricing" },
    { name: "For dieticians", link: "/dietician-page" },
    { name: "FAQS", link: "/faqs" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-4 py-5 font-instrument-sans lg:justify-evenly">
      {/* <div className="w-20 h-10">
        <img src={logo} alt="MamaPut AI Logo" className="object-cover"/>
      </div> */}
      <h3 className="heading--settings">MamaPut AI</h3>

      {/* Mobile menu button */}
      <button
        className="z-20 block h-10 w-10 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <XMarkIcon /> : <Bars3CenterLeftIcon />}
      </button>

        {/* NavLink Menu*/}
      <div
        className={`${
          isOpen
            ? "fixed inset-0 z-10 flex flex-col pt-20 px-6 bg-white"
            : "hidden"
        } md:static md:flex md:flex-row md:items-center md:pt-0 md:bg-transparent md:z-auto`}
      >
        <ul className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 lg:space-x-8 md:mr-6">
          {navLinks.map((navLink, index) => (
            <li key={index} className="text-lg md:text-xs lg:text-base">
              <Link 
                to={navLink.link}
                onClick={() => setIsOpen(false)}
              >
                {navLink.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="flex flex-col space-y-4 mt-6 md:flex-row md:space-y-0 md:space-x-4 md:mt-0 md:items-center">
          <li>
            <Link 
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-lg md:text-xs lg:text-base"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block uppercase btn--text-white bg-black rounded text-lg md:text-xs"
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;