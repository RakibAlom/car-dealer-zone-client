import React from 'react';
import paymentSystem from '../../assets/images/payment-system.webp'

const Footer = () => {
  return (
    <>

      <footer className="p-10 bg-base-200 border-t border-gray-300">
        <div className="container md:mx-auto">
          <div className='pb-5'>
            <img src={paymentSystem} alt="Pay with" />
          </div>
          <div className='footer text-base-content'>
            <div>
              <h3 className='text-2xl font-bold text-[#f06425]'>CarDealer</h3>
              <p>Car Dealer is the leading search car venture in the world, <br /> that helps users buy cars that are right for them.</p>
              <p>&copy; Copyright - Rakib Alom</p>
            </div>
            <div>
              <span className="footer-title">Services</span>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </div>
            <div>
              <span className="footer-title">Company</span>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </div>
            <div>
              <span className="footer-title">Legal</span>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;