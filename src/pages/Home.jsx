import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Toaster } from "react-hot-toast";

import photo from '../assets/student.png';
import students from '../assets/studentsgroup.png';
import meeting from '../assets/meeting.png';
import offer from '../assets/offer.png';
import thinking from '../assets/thinking.png';

import { RiGlobeLine, RiCustomerService2Line } from "react-icons/ri";
import { PiGraduationCapBold, PiBookBold, PiCertificateFill } from "react-icons/pi";
import { ImBooks } from "react-icons/im";

import Bnfts from '../Components/Bnfts';
import Service from '../Components/Service';
import { FaMoneyBillWave } from 'react-icons/fa';
import Course from '../Components/Course';

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <main className=''>
      <Toaster />

      <section className='grid grid-cols-1 lg:grid-cols-2 gap-16 md:px-40 px-10 mt-8'>
        <article data-aos="fade-right" data-aos-duration="1000" data-aos-delay="1000" className='container flex flex-col justify-center space-y-8'>
          <h1 className='text-2xl md:text-3xl lg:text-5xl font-bold'>{t('fluencyStartsHere1')} <span className="text-[var(--Yellow)]">{t('fluencyStartsHere2')}</span>  {t('fluencyStartsHere3')}</h1>
          <p className='text-lg md:text-xl'>{t('learnFromInstructors')}</p>

          <div className="flex items-center space-x-8 text-xl">
            <img src={students} alt="students" className='w-40' />
            <p className=''>{t('studentsCount')}</p>
          </div>

          <div className="flex justify-between space-y-7 lg:space-y-0 flex-col lg:flex-row">
            <button onClick={() => { navigate('/ApplicationForm'); window.scroll(0, 0) }} className='p-4 rounded-4xl bg-[var(--Yellow)]'>{t('bookFreeTrial')}</button>
            <button onClick={() => { navigate('/courses'); window.scroll(0, 0) }} className='p-4 rounded-4xl border-2 border-[var(--Yellow)]'>{t('exploreCourses')}</button>
          </div>
        </article>

        <article data-aos="fade-left" data-aos-duration="1000" data-aos-delay="1000" className='container flex justify-center lg:justify-end'>
          <img className="h-full w-lg" src={photo} alt="student" />
        </article>
      </section>

      <section className='text-center my-10 md:px-40 px-10'>
        <h1 className='text-2xl md:text-3xl my-8 font-extrabold'>{t('ourJourney')}</h1>
        <img data-aos="fade-up" data-aos-duration="2500" data-aos-delay="400" className='w-full mx-auto' src={meeting} alt="meeting" />
      </section>

      <section className='text-center w-full my-8 bg-[var(--Light)]'>
        <h1 className='font-bold text-2xl md:text-3xl py-5'>{t('academyInNumbers')}</h1>

        <div className='md:px-48 grid grid-cols-1 md:grid-cols-3 pb-5'>
          <article data-aos="fade-up" data-aos-duration="2000" data-aos-delay="1000" className='flex justify-center text-center my-2 flex-col items-center space-y-3'>
            <PiBookBold className='text-8xl font-bold text-white bg-[var(--Main)] p-6 rounded-full' />
            <h1 className='font-bold text-2xl'>+30</h1>
            <p className='md:text-xl'>{t('coursesAvailable')}</p>
          </article>

          <article data-aos="fade-up" data-aos-duration="1000" data-aos-delay="2000" className='flex justify-center text-center my-2 flex-col items-center space-y-3'>
            <PiGraduationCapBold className='text-8xl text-white bg-[var(--Main)] p-6 rounded-full' />
            <h1 className='font-bold text-2xl'>+360</h1>
            <p className='md:text-xl'>{t('certifiedGraduates')}</p>
          </article>

          <article data-aos="fade-up" data-aos-duration="2000" data-aos-delay="3000" className='flex justify-center text-center my-2 flex-col items-center space-y-3'>
            <RiGlobeLine className='text-8xl text-white bg-[var(--Main)] p-6 rounded-full' />
            <h1 className='font-bold text-2xl'>+15</h1>
            <p className='md:text-xl'>{t('globalResearch')}</p>
          </article>
        </div>
      </section>

      <section className='px-10 md:px-40'>
        <h1 className='font-bold text-center text-2xl sm:text-3xl py-5 mb-8'>{t('bookFreeTrialLesson')}</h1>

        <article className='grid grid-cols-1 gap-4 lg:grid-cols-8 md:gap-8 relative'>
          {/* First Step Section */}
          <div data-aos="fade-right" data-aos-duration="3000" data-aos-delay="1000" className='border-2 text-start rounded-4xl p-6 md:p-12 space-y-6 md:space-y-10 z-0 md:col-span-4'>
            <h3 className='font-bold text-2xl md:text-4xl'>{t('firstStep1')} <span className="text-[var(--Yellow)]">{t('firstStep2')}</span> {t('firstStep3')}</h3>
            <p className='text-sm md:text-lg'>{t('freeSession')}</p>
          </div>

          {/* Spacer for larger screens */}
          <div className='hidden lg:block'></div>

          {/* Image - Hidden on small screens */}
          <img src={offer} className={`absolute hidden lg:block w-80 h-80 z-10 end-full md:end-80 ${i18n.language === 'ar' && 'scale-x-[-1]'}`} alt="offer" />

          {/* Benefits Section */}
          <div data-aos="fade-left" data-aos-duration="3000" data-aos-delay="1000" className='text-start flex flex-col space-y-6 md:space-y-8 z-0 col-span-3'>
            <h2 className='font-bold text-2xl md:text-3xl'>{t('benefits')}</h2>
            <div className='flex flex-col space-y-6 md:space-y-8'>
              <Bnfts text={t('freeTrialSession')} />
              <Bnfts text={t('personalizedFeedback')} />
              <Bnfts text={t('noObligations')} />
            </div>
          </div>
        </article>

        {/* Book Free Trial Button */}
        <div data-aos="fade-left" data-aos-duration="3000" data-aos-delay="1000" className="flex justify-end my-8">
          <button onClick={() => { navigate('/ApplicationForm'); window.scroll(0, 0) }} className='p-3 sm:p-4 rounded-4xl bg-[var(--Yellow)] text-sm sm:text-base'>
            {t('bookFreeTrial')}
          </button>
        </div>
      </section>

      <section className='md:px-40 px-10'>
        <h1 className='font-bold text-center text-2xl lg:text-3xl py-5 mb-8'>{t('discoverOurServices')}</h1>

        <article className='grid grid-cols-1 gap-x-2 my-6 lg:grid-cols-7 lg:gap-x-8 lg:my-12'>
          <div className='flex w-full justify-center lg:justify-end lg:items-end mb-6 lg:m-0 lg:col-span-3'>
            <img src={thinking} className='w-full h-96 lg:h-[80%]' alt="thinking" />
          </div>
          <div className='space-y-4 lg:space-y-8 lg:col-span-4'>
            <Service data-aos="fade-left" icon={RiCustomerService2Line} title={t('interactiveLiveClasses')} details={t('interactiveLiveClassesDetails')} />
            <Service data-aos="fade-left" icon={FaMoneyBillWave} title={t('affordablePlans')} details={t('affordablePlansDetails')} />
            <Service data-aos="fade-left" icon={RiGlobeLine} title={t('globalAccess')} details={t('globalAccessDetails')} />
            <Service data-aos="fade-left" icon={PiCertificateFill} title={t('certifiedCourses')} details={t('certifiedCoursesDetails')} />
            <Service data-aos="fade-left" icon={ImBooks} title={t('comprehensiveResources')} details={t('comprehensiveResourcesDetails')} />
          </div>
        </article>
      </section>

      <section className='px-10 md:px-40'>
        <h1 className='font-bold text-center text-xl md:text-3xl py-5 mb-8'>{t('masterEnglish')}</h1>

        <article data-aos="fade-up" data-aos-delay="1000" className='grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6'>
          <Course direc="ILETS" title={t('courses.ilets')} />
          <Course direc="Group" title={t('courses.group')} />
          <Course direc="Private" title={t('courses.private')} />
        </article>
      </section>
    </main>
  );
}

export default Home;