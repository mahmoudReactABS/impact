import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { TranslationProvider } from '../TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

import { FaWhatsapp } from 'react-icons/fa';

const MainLayout = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <I18nextProvider i18n={i18n}>
        <TranslationProvider>
          <div data-aos="fade-down" data-aos-duration="1000" className="flex w-full justify-center">
            <Navbar />
          </div>
          <Link to='https://wa.me/+20123456789' target='_blank' className="fixed bottom-5 right-5 lg:bottom-10 lg:right-10 bg-[#25D366] text-white p-4 rounded-full text-5xl z-50">
            <FaWhatsapp />
          </Link>
          <Outlet />
          <Footer />
        </TranslationProvider>
      </I18nextProvider>
    </main>
  );
};

export default MainLayout;
