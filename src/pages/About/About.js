import React from 'react';

const About = () => {
  return (
    <>
      <div className='container md:mx-auto'>
        <div className='my-10 bg-white shadow-lg rounded-lg p-10'>
          <h2 className='pb-5 text-3xl font-bold'>World's Largest <span className='text-[#f06425]'>Automotive Marketplace</span></h2>
          <p className='text-base'>CarDealer.com is the leading brand and most reliable online auto marketplace developed by Bhalo Ventures Limited. CarDealer.com was founded in 2021. Our headquarter is in Sylhet (Bangladesh). It’s mission is to bring ease and delight in car buying and selling process. CarDealer offers a bouquet of reliable tools and services to help car consumers decide on buying the right car, at the right price and from the right partner.</p>
          <h2 className='py-5 text-3xl font-bold'>Our <span className='text-[#f06425]'>Key Features</span></h2>
          <p className='text-base'>- Buy Car (Brand New Car, Reconditioned Car, Used Car)</p>
          <p className='text-base'>- Sell Car (Brand New Car, Reconditioned Car, Used Car)</p>
          <p className='text-base'>- Buy Bike</p>
        </div>
      </div>
    </>
  );
};

export default About;