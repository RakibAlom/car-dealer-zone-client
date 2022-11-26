import React from 'react';
import ContactMap from '../Contact/ContactMap/ContactMap';
import AdvetiseProducts from './AdvertiseProducts/AdvetiseProducts';
import Banner from './Banner/Banner';
import ProductsBrandHome from './ProductsBrandHome/ProductsBrandHome';

const Home = () => {
  return (
    <>
      <div className="">
        <Banner></Banner>
        <AdvetiseProducts></AdvetiseProducts>
        <ProductsBrandHome></ProductsBrandHome>
      </div>
    </>
  );
};

export default Home;