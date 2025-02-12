import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import bg from '../assets/bgcourses-Photoroom.png'

function Course(props) {
 const { t } = useTranslation(),
  navigate = useNavigate();

 return (
  <article className='text-center text-white space-y-10 bg-[var(--Main)] rounded-4xl py-4 px-3 relative overflow-hidden'
   style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
   {/* Overlay */}
   <div className='absolute inset-0 bg-[var(--Main)]/85 h-full z-10'></div>

   {/* Content */}
   <div className='relative z-20 space-y-10'>
    <h1 className='text-2xl text-[var(--Yellow)] font-bold'>{props.title}</h1>
    <h3 className='text-xl font-bold'>{t('liveSession.title')}</h3>

    <div className='space-y-5'>
     <p>{t('liveSession.duration')}</p>
     <p>{t('liveSession.sessionsPerWeek')}</p>
     <p>{t('liveSession.schedule')}</p>
    </div>

    <button
     onClick={() => { navigate(`/courses/${props.direc}`); window.scroll(0, 0) }}
     className='bg-white p-3 text-black rounded-4xl w-full'
    >
     {t('liveSession.moreDetails')}
    </button>
   </div>
  </article>
 )
}

export default Course
