import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/Logo White 1.png';
import user from '../../assets/ins7.png';
import { RxCalendar, RxDashboard } from 'react-icons/rx';
import { GiPapers, GiWallet } from 'react-icons/gi';
import { CiSettings } from "react-icons/ci";
import { MdOutlineLogout } from 'react-icons/md';

function Nav() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <RxDashboard />, path: '/dash' },
    { name: 'Student Booking', icon: <RxCalendar />, path: '/booking' },
    { name: 'Requests', icon: <GiPapers />, path: '/requests' },
    { name: 'Payment', icon: <GiWallet />, path: '/payment' },
    { name: 'Settings', icon: <CiSettings />, path: '/dash/settings' },
  ];

  return (
    <nav className='bg-[var(--Main)] p-10 space-y-20'>
      <img src={logo} className='w-48' alt='Logo' />

      <section className='flex items-center gap-5 text-white'>
        <article className='w-20'>
          <img src={user} alt='User' />
        </article>
        <article>
          <h1 className='text-xl'>weweewewe</h1>
          <p className='text-sm text-gray-200'>Admin</p>
        </article>
      </section>

      <section className='text-white space-y-6'>
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path}
            className={`flex gap-3 items-center text-2xl rounded-lg p-5 ${location.pathname === item.path ? 'bg-white text-black' : ''}`}>
            {item.icon}
            <p className='text-lg'>{item.name}</p>
          </Link>
        ))}
      </section>

      <Link className='text-[var(--Yellow)] text-3xl flex gap-5 justify-start items-center' to='/dash/login'>
        <MdOutlineLogout />
        <span>Logout</span>
      </Link>
    </nav>
  );
}

export default Nav;
