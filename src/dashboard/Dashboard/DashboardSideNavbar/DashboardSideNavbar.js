import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaCar, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const DashboardSideNavbar = ({ hidden, setHidden }) => {
  const { logOut } = useContext(AuthContext)
  const handleLogOut = () => {
    logOut()
      .then(res => {
        toast.success('Logout Successfully Done!')
      })
      .catch(err => {
        console.error(err)
        toast.error('Something happened wrong!')
      })
  }
  return (
    <>
      <aside id="sidebar" className={`fixed ${hidden ? 'hidden' : null} z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75`} aria-label="Sidebar">
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2">
                <li>
                  <NavLink to='/dashboard' className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group">
                    <FaTachometerAlt className="text-xl text-gray-500"></FaTachometerAlt>
                    <span className="ml-3">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/add-product' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaCar className="text-xl text-gray-500"></FaCar>
                    <span className="ml-3 flex-1 whitespace-nowrap">Add Product</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/products' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaCar className="text-xl text-gray-500"></FaCar>
                    <span className="ml-3 flex-1 whitespace-nowrap">My Products</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/sellers' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaUsers className="text-xl text-gray-500"></FaUsers>
                    <span className="ml-3 flex-1 whitespace-nowrap">All Sellers</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/buyers' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaUsers className="text-xl text-gray-500"></FaUsers>
                    <span className="ml-3 flex-1 whitespace-nowrap">All Buyers</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='/dashboard/users' className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaUsers className="text-xl text-gray-500"></FaUsers>
                    <span className="ml-3 flex-1 whitespace-nowrap">All Users</span>
                  </NavLink>
                </li>
                <hr />
                <li>
                  <NavLink onClick={() => handleLogOut()} className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group ">
                    <FaSignOutAlt className="text-xl text-gray-500"></FaSignOutAlt>
                    <span className="ml-3 flex-1 whitespace-nowrap">Sign Out</span>
                  </NavLink>
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