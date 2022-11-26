import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import './Navbar.css'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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

  const menuItems = <>
    <li><NavLink className="rounded btn-sm " to="/">Home</NavLink></li>
    <li><NavLink className="rounded btn-sm " to="/blog">Blog</NavLink></li>
    <li><NavLink className="rounded btn-sm " to="/about">About</NavLink></li>
    <li><NavLink className="rounded btn-sm " to="/contact">Contact</NavLink></li>
  </>

  return (
    <>
      {/* TOP NAVBAR */}
      <div className="md:container md:mx-auto">
        <div className="navbar bg-base-100 px-0 py-3">
          <div className="navbar-start flex-1 lg:hidden">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                {menuItems}
              </ul>
            </div>
          </div>

          <div className="flex-1">
            <Link className="font-bold text-xl" to="/">CarDealer</Link>
          </div>

          <div className="flex-none gap-4">
            {user && user.uid ?
              <>
                <ul className="menu menu-horizontal p-0 gap-4 font-medium">
                  <li><NavLink to="/dashboard" className='rounded bg-white drop-shadow btn-sm'>Dashbaord</NavLink></li>
                </ul>
                <div className="dropdown dropdown-end">
                  <label tabIndex={0}>
                    <div className="w-7 rounded-full cursor-pointer">
                      <img className='rounded-full' src="https://placeimg.com/80/80/people" alt="" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li><button onClick={() => handleLogOut()}>Logout</button></li>
                  </ul>
                </div>
              </>
              :
              < ul className="menu menu-horizontal p-0 gap-4 font-medium">
                <li><NavLink to="/login" className='rounded-full bg-white drop-shadow btn-sm'>Login</NavLink></li>
                <li><NavLink to="/register" className='rounded-full bg-white drop-shadow btn-sm'>Register</NavLink></li>
              </ul>
            }

          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="navbar bg-[#f06425] py-2 hidden lg:flex sticky top-0">
        <div className="md:container md:mx-auto">
          <div className="navbar-center w-full">
            <ul className="menu menu-horizontal p-0 w-full flex justify-between text-white font-medium">
              {menuItems}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;