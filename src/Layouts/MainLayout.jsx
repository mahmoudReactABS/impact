import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import Footer from '../Components/Footer';
import { TranslationProvider } from '../TranslationContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

import { FaWhatsapp } from 'react-icons/fa';

const MainLayout = () => {
  // const [coordinates, setCoordinates] = useState({
  //   latitude: null,
  //   longitude: null,
  // });

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCoordinates({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (err) => {
  //         setError(err.message);
  //       }
  //     );
  //   } else {
  //     setError('Geolocation is not supported by this browser.');
  //   }
  // }, []);

  // const [error, setError] = useState(null);
  return (
    <main className="overflow-x-hidden">
      <I18nextProvider i18n={i18n}>
        <TranslationProvider>
          <Navbar />
          <Link to='https://wa.me/+20123456789' target='_blank' className="fixed bottom-5 right-5 lg:bottom-10 lg:right-10 bg-[#25D366] text-white p-4 rounded-full text-3xl md:text-5xl z-50">
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
