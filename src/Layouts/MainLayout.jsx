import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { TranslationProvider } from '../TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const MainLayout = () => {
  return (
    <main className="w-full overflow-x-hidden">
      <I18nextProvider i18n={i18n}>
        <TranslationProvider>
          <div data-aos="fade-down" data-aos-duration="1000" className="flex w-full justify-center">
            <Navbar />
          </div>
          <Outlet />
          <Footer />
        </TranslationProvider>
      </I18nextProvider>
    </main>
  );
};

export default MainLayout;