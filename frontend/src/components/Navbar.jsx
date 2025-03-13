import { useState } from "react";
import { FiSettings, FiUsers } from "react-icons/fi";
import { HiOutlineViewGrid, HiOutlineChartBar, HiOutlineCube, HiOutlineDeviceMobile } from "react-icons/hi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoMenu, IoClose } from "react-icons/io5";
import profile_pic from "../assets/profile_pic.jpg";
import useScreenWidth from "../hooks/screenWidth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const screenWidth = useScreenWidth();

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <div className={`relative h-full`}>
      {/* Hamburger Menu for Screens < 1336px */}
      {screenWidth < 1336 && (
        <button onClick={toggleNavbar} className="p-4 text-gray-600">
          {isOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>
      )}

      {/* Sidebar */}
      {(screenWidth >= 1336 || isOpen) && (
        <div className={`h-full bg-stone-100 p-6 rounded-md shadow-md flex flex-col justify-between transition-transform duration-300 ${screenWidth >= 1336 ? "w-full" : "w-[250px]"} fixed top-0 left-0  lg:relative z-50`}>
          <div>
            {/* Logo */}
            <div className="text-xl font-bold mb-8">Salesway</div>

            {/* Settings & Team */}
            <div className="flex flex-col gap-4 mb-4">
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <FiSettings size={18} /> Settings
              </a>

              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <FiUsers size={18} /> Team
              </a>
            </div>

            {/* Menu Title */}
            <p className="text-xs text-gray-400 uppercase mb-3">Menu</p>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-2 text-blue-600 font-medium bg-white p-2 rounded-lg shadow-sm">
                <HiOutlineSquares2X2 size={18} /> Dashboard
              </a>

              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <HiOutlineChartBar size={18} /> Campaigns
              </a>

              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <HiOutlineCube size={18} /> Flows
              </a>

              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <HiOutlineDeviceMobile size={18} /> Integrations
              </a>

              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <HiOutlineViewGrid size={18} /> Customers
              </a>
            </nav>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 mt-8">
            <img src={profile_pic} alt="User" className="w-8 h-8 rounded-full" />
            <span className="text-gray-700 font-medium">Debasmita</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
