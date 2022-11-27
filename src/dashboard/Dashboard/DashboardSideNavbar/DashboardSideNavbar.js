import React from 'react';
import { FaCar, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

const DashboardSideNavbar = ({ hidden, setHidden }) => {
  return (
    <>
      <aside id="sidebar" className={`fixed ${hidden ? 'hidden' : null} z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`} aria-label="Sidebar">
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <Link to='/dashboard' className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                    <FaTachometerAlt className="text-xl text-gray-500"></FaTachometerAlt>
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaUsers className="text-xl text-gray-500"></FaUsers>
                    <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaCar className="text-xl text-gray-500"></FaCar>
                    <span className="ml-3 flex-1 whitespace-nowrap">Products</span>
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaSignOutAlt className="text-xl text-gray-500"></FaSignOutAlt>
                    <span className="ml-3 flex-1 whitespace-nowrap">Sign Out</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSideNavbar;