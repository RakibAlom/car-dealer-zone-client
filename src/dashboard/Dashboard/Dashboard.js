import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardFooter from '../DashboardLayout/DashboardFooter/DashboardFooter';
import DashboardHeader from '../DashboardLayout/DashboardHeader/DashboardHeader';
import DashboardSideNavbar from './DashboardSideNavbar/DashboardSideNavbar';

const Dashboard = () => {

  const [hidden, setHidden] = useState(true)

  return (
    <>
      <div className='h-96 text-center'>
        <h2 className='pt-48 text-2xl font-medium text-[#f06425]'>Welcome to Dashboard!</h2>
      </div>
    </>
  );
};

export default Dashboard;