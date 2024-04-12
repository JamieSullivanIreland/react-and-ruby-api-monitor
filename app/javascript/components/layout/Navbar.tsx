import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar bg-primary-color'>
      <div className='contain'>
        <a
          className='navbar-brand'
          href='#'
        >
          <h1 className='display-6 text-light m-0'>Server Metrics</h1>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
