import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

const navLink = [
  { label: "Dashboard", path: "/" },
  { label: "Discover User", path: "/allUser" },
  { label: "Friends", path: "/Friends" },
  { label: "Request Sent", path: "/requestSent" },
  { label: "Request Received", path: "/requestRecieved" },
];

function Navbar() {
  const location = useLocation();
  const pathName = location.pathname;
  
  return (
    <nav className="flex justify-around mb-4 border-b border-gray-200 overflow-hidden overflow-x-auto">
      {navLink.map((link, index) => {
        return (
          <div
            key={index}
            className={`py-2 px-4 ${
              pathName === link.path
                ? `border-b-4 border-orange-500 text-orange-500`
                : `text-gray-500 hover:text-orange-500`
            }`}
          >
            <NavLink to={link.path} className="whitespace-nowrap">
              {link.label}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}

export default Navbar;
