import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo White 1.png'
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t, i18n } = useTranslation()

  return (
    <footer className={`grid grid-cols-1 lg:grid-cols-2 p-10 lg:p-20 lg:px-40 text-white bg-gradient-to-r from-[var(--GradBg)] to-[var(--Main)] mt-12 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <section data-aos="fade-right" data-aos-duration="1000" className='space-y-6'>
        <img src={logo} className='w-40 lg:w-60' alt="Logo" />

        <h1 className='font-bold text-2xl'>{t('AboutUs')}</h1>

        <p className='md:text-md'>{t('footerDescription')}</p>
      </section>

      <article data-aos="fade-left" data-aos-duration="1000" className='flex justify-evenly space-x-10 lg:space-x-15 space-y-5 lg:space-y-0 flex-row mt-10 lg:mt-0'>
        <section className='text-center space-y-4'>
          <h1 className='underline font-bold text-xl'>{t('quickLinks')}</h1>

          <ul className='space-y-2 md:space-y-4 text-sm md:text-lg'>
            <li><Link onClick={() => window.scroll(0, 0)} to="/">{t('Home')}</Link></li>
            <li><Link onClick={() => window.scroll(0, 0)} to="/courses">{t('Courses')}</Link></li>
            <li><Link onClick={() => window.scroll(0, 0)} to="/about">{t('AboutUs')}</Link></li>
          </ul>
        </section>

        <section className='text-center space-y-6'>
          <h1 className='underline font-bold text-xl'>{t('followUs')}</h1>

          <ul className='flex justify-center space-x-3 lg:space-x-6 text-xl md:text-2xl'>
            <li><FaInstagram /></li>
            <li><FaFacebook /></li>
            <li><FaTiktok /></li>
          </ul>

          <div className='text-center space-y-3 lg:space-y-6'>
            <h1 className='underline font-bold text-xl'>{t('contactUs')}</h1>
            <div className='flex gap-x-2 items-center justify-center text-lg md:text-xl'>
              <FaWhatsapp className='' /> 
              <span>{t('whatsappNumber')}</span>
            </div>
          </div>
        </section>
      </article>
      
      <article data-aos="fade-right" data-aos-duration="1000" className='space-y-4 mt-12 text-md'>
        <p> <span className='underline'>{t('privacyPolicy')}</span> | <span className='underline'>{t('contentPolicy')}</span> | <span className='underline'>{t('termsOfUse')}</span></p>
        <p>{t('designedBy')}</p>
        <p>{t('allRightsReserved')}</p>
      </article>
    </footer>
  )
}

export default Footer