import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
  return (
    <div className='text-center'>
      <h1 className='text-red-600 font-bold'>404 Not Found</h1>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound404;