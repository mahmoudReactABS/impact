import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { TranslationProvider } from '../TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import logo from '../assets/logoblue.png';

const SubLayout = () => {
 return (
  <main className="w-full overflow-x-hidden">
   <I18nextProvider i18n={i18n}>
    <TranslationProvider>
     <Link to="">
     <img src={logo} data-aos="fade-down" data-aos-duration="5000" className="w-[40%] h-16 my-12 md:px-40 px-4" alt="Logo" />
     </Link>
     <Outlet />
     <Footer />
    </TranslationProvider>
   </I18nextProvider>
  </main>
 );
};

export default SubLayout;