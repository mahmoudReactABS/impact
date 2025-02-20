import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo White 1.png';
import user from '../../assets/ins7.png';
import { RxCalendar, RxDashboard } from 'react-icons/rx';
import { GiPapers, GiWallet } from 'react-icons/gi';
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from 'react-icons/md';
import { useAdmin } from '../../AdminContext';
import { PiBooksBold } from 'react-icons/pi';

function Nav() {
  const location = useLocation();
  const { admin, setAdmin } = useAdmin();

  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, [setAdmin]);

  const menuItems = [
    { name: 'Dashboard', icon: <RxDashboard />, path: '/dash/'},
    { name: 'Student Booking', icon: <RxCalendar />, path: '/dash/booking' },
    { name: 'Courses & Plans', icon: <PiBooksBold />, path: '/dash/courses' },
    { name: 'Requests', icon: <GiPapers />, path: '/dash/requests' },
    { name: 'Payment', icon: <GiWallet />, path: '/dash/payment' },
    { name: 'Settings', icon: <CiSettings />, path: '/dash/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setAdmin(null);
  };

  const isActive = (itemPath) => {
    if (itemPath === '/dash/') {
      return location.pathname === itemPath;
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <nav className='bg-[var(--Main)] p-10 space-y-20 h-full'>
      <img src={logo} className='w-48' alt='Logo' />

      {/* Display admin data */}
      <section className='flex items-center gap-5 text-white'>
        <article className='w-20'>
          <img src={user} alt='User' />
        </article>
        <article>
          <h1 className='text-2xl'>{admin?.Name}</h1>
          <p className='text-md text-gray-200'>{admin?.Previlige}</p>
        </article>
      </section>

      <section className='text-white space-y-6'>
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path} onClick={()=>window.scroll(0,0)}
          className={`flex gap-3 items-center text-2xl rounded-lg p-5 ${isActive(item.path) ? 'bg-white text-black' : ''}`}>
            {item.icon}
            <p className='text-lg'>{item.name}</p>
          </Link>
        ))}
      </section>

      <Link to='/dash/login' className='text-[var(--Yellow)] text-2xl font-semibold flex gap-5 justify-start items-center' onClick={handleLogout}>
        <MdOutlineLogout />
        <span>Logout</span>
      </Link>
    </nav>
  );
}

export default Nav;
