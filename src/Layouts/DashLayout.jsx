import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TranslationProvider } from '../TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Nav from '../Components/dashboard/Nav';

const DashLayout = () => {
 return (
  <main className="w-full overflow-x-hidden grid grid-cols-10">
   <I18nextProvider i18n={i18n}>
    <TranslationProvider>
     <div className="col-span-2">
      <Nav />
     </div>
     <div className="col-span-8  p-8">
      <Outlet />
     </div>
    </TranslationProvider>
   </I18nextProvider>
  </main>
 );
};

export default DashLayout;