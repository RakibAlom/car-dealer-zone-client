import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import paymentSystem from '../../assets/images/payment-system.webp'

const Footer = () => {

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch(`https://car-dealer-zone-server.vercel.app/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    fetch(`https://car-dealer-zone-server.vercel.app/brands`)
      .then(res => res.json())
      .then(data => {
        setBrands(data)
        setLoading(false)
      })
  }, [])
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
              <span className="footer-title">Categories</span>
              {
                categories.slice(0, 4).map((item, i) =>
                  <Link className="link link-hover" key={i} to={`/category/${item.slug}`}>{item.name}</Link>
                )
              }
            </div>
            <div>
              <span className="footer-title">Brands</span>
              {
                brands.slice(0, 4).map((item, i) =>
                  <Link className="link link-hover" key={i} to={`/brand/${item.slug}`}>{item.name}</Link>
                )
              }
            </div>
            <div>
              <span className="footer-title">Other</span>
              <Link className="link link-hover" to="/blog">Blog</Link>
              <Link className="link link-hover" to="/about">About</Link>
              <Link className="link link-hover" to="/contact">Contact</Link>
              <Link className="link link-hover" to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;