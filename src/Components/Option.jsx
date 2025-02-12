import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import bg from '../assets/bgcourses-Photoroom.png'

function Option(props) {
  const { t } = useTranslation();

  return (
    <article data-aos={props.number % 2 === 0 ? "fade-up-right" : "fade-up"} data-aos-delay="1000" data-aos-duration="1500"
      className='text-center text-white space-y-5 bg-[var(--Main)] rounded-3xl py-4 px-3 relative overflow-hidden'
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-[var(--Main)]/85 rounded-3xl h-full z-10'></div>

      {/* Content */}
      <div className='relative z-20 space-y-5'>
        <h1 className='text-2xl md:text-4xl text-[var(--Yellow)] font-bold'>{props.levelno}</h1>
        <h3 className='text-xl md:text-2xl line-through font-bold text-gray-200'>{props.priceBefore} $</h3>
        <h3 className='text-2xl md:text-3xl font-bold'>{props.priceAfter} $</h3>

        <div className='space-y-4 py-5 text-lg'>
          <h1>{props.duration} {t('Session')}</h1>
          <p>{props.totalTime}</p>
          <p>{props.sessionPerWeek} {t('sess/week')}</p>
          <p>{props.Hours} {t('Hr/Sess')}</p>
          <p>{props.scheduleType}</p>
        </div>

        {/* Passing selected option data via Link */}
        <Link
          to='/ApplicationForm'
          onClick={() => window.scroll(0, 0)}
          state={{ courseCategory: props.courseCategory, option: props.option, levelno: props.levelno, priceAfter: props.priceAfter, duration: props.duration, totalTime: props.totalTime, sessionPerWeek: props.sessionPerWeek, Hours: props.Hours, scheduleType: props.scheduleType }}
          className='bg-white p-3 text-black rounded-3xl w-full block'>
          {t('enrll')}
        </Link>
      </div>
    </article>
  );
}

export default Option;