import React from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../assets/images';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import '../assets/images/logo.css';
import '../styles/Navbar.css';

const Navbar = ({ isMenuOpen, handleMenuToggle }) => {
  return (
    <header className='header'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className="logo-round" />
        <h1><b>Home</b></h1>
      </NavLink>
      <button className='mobile-menu-button' onClick={handleMenuToggle}>
        {isMenuOpen ? <AiOutlineClose size={24} /> : <HiMenuAlt3 size={24} />}
      </button>
      <nav className={`desktop-nav ${isMenuOpen ? 'mobile-menu-open' : ''}`}>
        <NavLink to='/about' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          About
        </NavLink>
        <NavLink to='/projects' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Projects
        </NavLink>
        <NavLink to='/resume' className={({ isActive }) => isActive ? "text-blue-600" : "text-black"}>
          Resume
        </NavLink>
      </nav>
      {isMenuOpen && (
        <div className='mobile-nav'>
          <NavLink to='/about' className='text-black font-bold'>
            About
          </NavLink>
          <NavLink to='/projects' className='text-black font-bold'>
            Projects
          </NavLink>
          <NavLink to='/resume' className='text-black font-bold'>
            Resume
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
