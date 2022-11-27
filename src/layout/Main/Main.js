import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Main = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <Toaster />
      </div>
    </>
  );
};

export default Main;