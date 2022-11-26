import React from 'react';
import ContactMap from '../Contact/ContactMap/ContactMap';
import AdvetiseProducts from './AdvertiseProducts/AdvetiseProducts';
import Banner from './Banner/Banner';

const Home = () => {
  return (
    <>
      <div className="">
        <Banner></Banner>
        <AdvetiseProducts></AdvetiseProducts>
      </div>
    </>
  );
};

export default Home;