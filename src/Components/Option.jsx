import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import bg from '../assets/bgcourses-Photoroom.png';

function Option(props) {
  const { t } = useTranslation();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [finalPriceBefore, setFinalPriceBefore] = useState(null); 
  const [finalPriceAfter, setFinalPriceAfter] = useState(null); 
  const [loading, setLoading] = useState(false);

  const send = async () => {
    setLoading(true);
    try {
      const dataBefore = await fetch("https://impact-backend-ten.vercel.app/get-currency", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          latitude,
          longitude,
          priceUSD: props.priceBefore 
        })
      });
      const finalDataBefore = await dataBefore.json();
      if (finalDataBefore) {
        setFinalPriceBefore(finalDataBefore);
      }

      const dataAfter = await fetch("https://impact-backend-ten.vercel.app/get-currency", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          latitude,
          longitude,
          priceUSD: props.priceAfter 
        })
      });
      const finalDataAfter = await dataAfter.json();
      if (finalDataAfter) {
        setFinalPriceAfter(finalDataAfter);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      send();
    }
  }, [latitude, longitude]);

  return (
    <article
      data-aos="fade-up"
      data-aos-delay="1000"
      data-aos-duration="1500"
      className='text-center text-white space-y-5 bg-[var(--Main)] rounded-4xl py-4 px-3 relative overflow-hidden'
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-[var(--Main)]/92 rounded-3xl h-full z-10'></div>

      {/* Content */}
      <div className='relative z-20 space-y-8 mt-4'>
        <h1 className='text-xl md:text-3xl text-[var(--Yellow)] font-bold'>{props.levelno}</h1>
        <div className="space-y-4">
          {/* Display converted priceBefore or fallback to props.priceBefore */}
          <h3 className='text-2xl md:text-4xl line-through font-bold text-gray-200'>
            {loading ? 'Loading...' : finalPriceBefore ? finalPriceBefore.finalPrice : props.priceBefore}
          </h3>
          {/* Display converted priceAfter or fallback to props.priceAfter */}
          <h3 className='text-5xl md:text-6xl font-bold'>
            {loading ? 'Loading...' : finalPriceAfter ? finalPriceAfter.finalPrice : props.priceAfter}
          </h3>
        </div>

        <div className='space-y-6 text-2xl'>
          <h1>{props.duration} {t('Session')}</h1>
          <p>{props.totalTime}</p>
          <p>{props.sessionPerWeek} {t('sess/week')}</p>
          <p>{props.Hours} {t('Hr/Sess')}</p>
          <p>{props.scheduleType}</p>
        </div>

        <Link
          to='/ApplicationForm'
          onClick={() => window.scroll(0, 0)}
          state={{
            number: props.number, courseCategory: props.courseCategory, option: props.option, levelno: props.levelno,
            priceAfter: finalPriceAfter || props.priceAfter,
            duration: props.duration, totalTime: props.totalTime, sessionPerWeek: props.sessionPerWeek, Hours: props.Hours, scheduleType: props.scheduleType
          }} className='bg-white p-3 text-black rounded-3xl w-full block'>
          {t('enrll')}
        </Link>
      </div>
    </article>
  );
}

export default Option;