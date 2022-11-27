import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import DashboardSideNavbar from '../../Dashboard/DashboardSideNavbar/DashboardSideNavbar';
import DashboardFooter from '../DashboardFooter/DashboardFooter';
import DashboardHeader from '../DashboardHeader/DashboardHeader';

const DashboardMain = () => {

  const [hidden, setHidden] = useState(true)

  return (
    <>
      <DashboardHeader setHidden={setHidden} hidden={hidden}></DashboardHeader>

      <div className="flex overflow-hidden bg-white pt-16">
        <DashboardSideNavbar setHidden={setHidden} hidden={hidden}></DashboardSideNavbar>
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
          <main>
            <div className="pt-6 px-4">
              <div className="w-full">
                <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2 min-h-full">
                  <Outlet></Outlet>
                </div>
              </div>
            </div>
          </main>
          <DashboardFooter></DashboardFooter>
        </div>
      </div>
      <Toaster></Toaster>
    </>
  );
};
export default DashboardMain;