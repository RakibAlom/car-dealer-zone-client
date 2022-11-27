import React from 'react';
import AdvetiseProducts from './AdvertiseProducts/AdvetiseProducts';
import Banner from './Banner/Banner';
import ProductsBrandHome from './ProductsBrandHome/ProductsBrandHome';
import ProductsCategoryHome from './ProductsCategoryHome/ProductsCategoryHome';
import ProductsHome from './ProductsHome/ProductsHome';

const Home = () => {
  return (
    <>
      <div className="">
        <Banner></Banner>
        <AdvetiseProducts></AdvetiseProducts>
        <ProductsCategoryHome></ProductsCategoryHome>
        <ProductsBrandHome></ProductsBrandHome>
        <ProductsHome></ProductsHome>
      </div>
    </>
  );
};

export default Home;