import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = ({ hidden, setHidden }) => {
  return (
    <>
      <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button id="toggleSidebarMobile" onClick={() => setHidden(!hidden)} aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                <svg id="toggleSidebarMobileHamburger" className={`w-6 h-6 ${hidden ? null : 'hidden'} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
                <svg id="toggleSidebarMobileClose" className={`w-6 h-6 ${hidden ? 'hidden' : null} `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <Link to="/dashboard" className="text-xl font-bold flex items-center lg:ml-2.5">
                <span className="self-center whitespace-nowrap">CarDealer</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link to="/" className="hidden sm:inline-flex ml-5 text-white bg-[#f06425] hover:bg-[#FF731D] focus:ring-4 focus:ring-cyan-200 btn-sm font-medium rounded text-sm px-5 py-2.5 text-center items-center mr-3">
                Visit Store
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DashboardHeader;