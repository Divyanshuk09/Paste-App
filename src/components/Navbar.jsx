import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex justify-center gap-6 py-4'>
      <NavLink 
        to='/' 
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg transition-all ${isActive ? 'text-white bg-blue-700' : 'text-blue-400 hover:bg-blue-600'}`
        }
      >
        Home
      </NavLink>
      <NavLink 
        to='/pastes' 
        className={({ isActive }) => 
          `px-4 py-2 rounded-lg transition-all ${isActive ? 'text-white bg-blue-700' : 'text-blue-400 hover:bg-blue-600'}`
        }
      >
        Pastes
      </NavLink>
    </nav>
  );
};

export default Navbar;