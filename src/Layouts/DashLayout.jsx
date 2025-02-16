import React from 'react';
import { Outlet } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Nav from '../Components/dashboard/Nav';
import { AdminProvider } from '../AdminContext'; 

const DashLayout = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AdminProvider> 
        <main className="w-full overflow-x-hidden grid grid-cols-10">
          <div className="col-span-2">
            <Nav />
          </div>
          <div className="col-span-8 p-8">
            <Outlet />
          </div>
        </main>
      </AdminProvider>
    </I18nextProvider>
  );
};

export default DashLayout;
