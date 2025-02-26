import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo White 1.png';
import logo2 from '../assets/logoblue.png';
import { useTranslationContext } from '../TranslationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarth } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
 const { t, i18n, changeLanguage } = useTranslationContext();
 const [isOpen, setIsOpen] = useState(false);
 const activeTab = "text-[var(--Yellow)] text-sm lg:text-lg font-bold";
 const tabStyle = "text-white text-sm lg:text-lg font-semibold hover:text-gray-200";
 const nav = useNavigate();

 const toggleLanguage = () => {
  const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
  changeLanguage(newLanguage);
  document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
 };

 return (
  <nav className="md:bg-[var(--Main)] w-7xl py-4 my-5 rounded-none md:rounded-full">
   <div className="px-4 sm:px-6 lg:px-8">
    <div className="h-full w-full flex justify-between items-center">
     {/* Logo */}
     <div className="hidden md:flex items-center me-20">
      <NavLink to="/">
       <img src={logo} alt="logo" className="h-10 w-full" />
      </NavLink>
     </div>
     <div className="md:hidden flex items-center me-20">
      <NavLink to="/">
       <img src={logo2} alt="logo" className="h-10 w-[45%]" />
      </NavLink>
     </div>

     {/* Mobile Menu Button */}
     <div className="md:hidden flex items-center me-8">
      <button onClick={() => setIsOpen(!isOpen)} className="text-[var(--Main)] focus:outline-none" aria-label="Toggle menu">
       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
       </svg>
      </button>
     </div>

     {/* Desktop Menu */}
     <div className="hidden md:flex items-center space-x-6 lg:space-x-10 me-20">
      <NavLink to="/" className={({ isActive }) => isActive ? activeTab : tabStyle}>
       {t('Home')}
      </NavLink>
      <NavLink to="/courses" className={({ isActive }) => isActive ? activeTab : tabStyle}>
       {t('Courses')}
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? activeTab : tabStyle}>
       {t('AboutUs')}
      </NavLink>
      {/* Language Selector and Book Free Test Button */}
      <div className="flex items-center space-x-8 lg:ms-20 xl:ms-40">
       <button onClick={() => nav('/bookTest')} className="bg-white p-3 rounded-4xl hover:bg-gray-100">
        {t('BookFree')}
       </button>
       <div onClick={toggleLanguage} className="flex cursor-pointer text-white items-center space-x-2">
        <FontAwesomeIcon icon={faEarth} />
        {i18n.language === 'en' ? <span>{t('Arabic')}</span> : <span>{t('English')}</span>}
       </div>
      </div>
     </div>
    </div>
   </div>


   {/* Mobile Menu */}
   {isOpen && (
    <div className="md:hidden">
     <div className="px-2 pt-2 text-center pb-3 space-y-1 sm:px-3">
      <div onClick={toggleLanguage} className="flex justify-center my-2 cursor-pointer text-[var(--Main)] items-center space-x-2">
       <FontAwesomeIcon icon={faEarth} />
       {i18n.language === 'en' ? <span>{t('Arabic')}</span> : <span>{t('English')}</span>}
      </div>
      <NavLink
       to="/"
       className={({ isActive }) =>
        isActive ? "text-[var(--Yellow)] block" : "text-[var(--Main)] block"
       }
      >
       {t('Home')}
      </NavLink>
      <NavLink
       to="/courses"
       className={({ isActive }) =>
        isActive ? "text-[var(--Yellow)] block" : "text-[var(--Main)] block"
       }
      >
       {t('Courses')}
      </NavLink>
      <NavLink
       to="/about"
       className={({ isActive }) =>
        isActive ? "text-[var(--Yellow)] block" : "text-[var(--Main)] block"
       }
      >
       {t('AboutUs')}
      </NavLink>
      <NavLink
       to="/bookTest"
       className={({ isActive }) =>
        isActive ? "text-[var(--Yellow)] block" : "text-[var(--Main)] block"
       }
      >
       {t('BookFree')}
      </NavLink>
     </div>
    </div>
   )}
  </nav>
 );
}

export default Navbar;