import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
    <nav>
      <ul className="main-nav">
        <li><NavLink exact to="/">Home</NavLink></li>
        {/* <li><NavLink to="/coffees/:id">Products</NavLink></li> */}
      </ul>
    </nav>
);

export default Header;