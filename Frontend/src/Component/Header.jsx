import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllUser, searchUsers } from "../Services/operations/userAPI";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = useSelector((state) => state.user.token);
  const [searchName, setSearchName] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  let timeoutId = null;

  const handleSearchInputChange = (e) => {
    setSearchName(e.target.value);
  };

  useEffect(() => {
    if (searchName.trim()) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        dispatch(searchUsers(searchName));
      }, 300);
    }
    else {
      dispatch(getAllUser(token));
    }

    return () => clearTimeout(timeoutId);
  }, [searchName, dispatch]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchName.trim()) {
      dispatch(searchUsers(searchName));
    }
  };

  return (
    <header className="sticky top-0 flex justify-between items-center bg-white px-3 py-4 md:p-5 rounded-2xl shadow-xl">
      <h1 className="text-sm lg:text-3xl font-bold text-orange-600">Friend For You</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-3 relative w-full max-w-md">
        <div className="flex items-center rounded-lg px-2 py-2 w-full border border-gray-300">
          <input
            type="search"
            className="w-full px-3 h-[5vh] text-black border rounded-lg outline-none focus:border-b-2 focus:border-orange-500"
            placeholder="Search by username or email"
            value={searchName}
            onChange={handleSearchInputChange}
          />
          <button
            className="bg-orange-500 text-white p-2 rounded-full ml-2 hover:bg-orange-600"
            onClick={handleSearchSubmit}
          >
            <FaSearch />
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div
          className="flex flex-col gap-2 items-center cursor-pointer"
          title={user.fullName}
          onClick={() => setShowDropDown(!showDropDown)}
        >
          <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-black">
            <img className="w-full h-full rounded-full" src={user?.profileImage} alt="profile" />
          </div>
        </div>

        {showDropDown && (
          <div className="absolute top-16 bg-gray-100 p-3 rounded-md right-4 font-medium shadow-md">
            <div className="flex flex-col gap-2 text-left">
              <NavLink
                to={`/user/${user.id}`}
                className="hover:bg-gray-200 p-2 rounded-md text-gray-700"
              >
                {user?.fullName}
              </NavLink>
              <button
                className="hover:bg-gray-200 p-2 rounded-md text-left text-red-500"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}
              >
                LogOut
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
