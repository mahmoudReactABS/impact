import React from 'react'
import Course from '../Components/Course'
import { useTranslation } from 'react-i18next';

function Courses() {
 const { t, i18n } = useTranslation();

 return (
  <section className='px-10 md:px-40'>
   <h1 data-aos="fade-up" className='font-bold text-3xl py-5 mb-8'>{t('ourcorses')}</h1>

   <article data-aos="fade-up" data-aos-delay="600" className='grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16'>
    <Course title={t('courses.ilets')} direc='ILETS' />
    <Course title={t('courses.group')} direc='Group' />
    <Course title={t('courses.private')} direc='Private' />
   </article>
  </section>
 )
}

export default Courses
