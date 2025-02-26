import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import { TranslationProvider } from '../TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import logo from '../assets/logoblue.png';
import { FaWhatsapp } from 'react-icons/fa';

const SubLayout = () => {
 return (
  <main className="w-full overflow-x-hidden">
   <I18nextProvider i18n={i18n}>
    <TranslationProvider>
     <Link to="">
      <img src={logo} data-aos="fade-down" data-aos-duration="5000" className="w-[35%] h-12 my-12 md:px-40 px-4" alt="Logo" />
     </Link>
     <Link to='https://wa.me/+20123456789' target='_blank' className="fixed bottom-10 right-10 bg-[#25D366] text-white p-4 rounded-full text-6xl z-50">
      <FaWhatsapp />
     </Link>
     <Outlet />
     <Footer />
    </TranslationProvider>
   </I18nextProvider>
  </main>
 );
};

export default SubLayout;