import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import meeting from '../assets/meeting.png';
import group from '../assets/group.png';
import light from '../assets/light.png';
import Instructor from '../Components/Instructor';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import ins1 from '../assets/ins1.png';
import ins2 from '../assets/ins2.png';
import ins3 from '../assets/ins3.png';
import ins4 from '../assets/ins4.png';
import ins5 from '../assets/ins5.png';
import ins6 from '../assets/ins6.png';
import ins7 from '../assets/ins7.png';
import ins8 from '../assets/ins8.png';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';

function AboutUs() {
 const { t, i18n } = useTranslation();
 const [show, setShow] = useState("hidden");
 const [show2, setShow2] = useState("hidden");

 const rotation1 = i18n.language === 'en' ? "-right-40" : "-left-31",
  rotation2 = i18n.language === 'en' ? " -left-40" : "-right-44";

 const btn_pos = i18n.language === 'en' ? "pe-14" : "pe-20";

 const [sliderRef, instanceRef] = useKeenSlider({
  slides: {
   perView: 4,
   spacing: 8,
  },
  breakpoints: {
   '(max-width: 992px)': {
    slides: {
     perView: 2,
     spacing: 7,
    },
   },
   '(max-width: 576px)': {
    slides: {
     perView: 1,
     spacing: 5,
    },
   },
  },
 });

 const features = {
  en: [
   {
    number: '1',
    title: t('PersonalizedFeedback'),
    description: t('One-on-one guidance from expert instructors.'),
   },
   {
    number: '2',
    title: t('LivePracticeSessions'),
    description: t('Real-time speaking and listening exercises.'),
   },
   {
    number: '3',
    title: t('ProgressTracking'),
    description: t('Regular assessments to measure improvement.'),
   },
   {
    number: '4',
    title: t('FlexibleLearningPaths'),
    description: t('Personalized Learning Experiences Designed to Match Your Unique Style, Pace, and Goals.'),
   },
  ],
  ar: [
   {
    number: '1',
    title: t('تعليقات مخصصة'),
    description: t('توجيه فردي من مدربين خبراء.'),
   },
   {
    number: '2',
    title: t('جلسات تدريبية مباشرة'),
    description: t('تمارين تحدث واستماع في الوقت الفعلي.'),
   },
   {
    number: '3',
    title: t('تتبع التقدم'),
    description: t('تقييمات منتظمة لقياس التحسن.'),
   },
   {
    number: '4',
    title: t('مسارات تعلم مرنة'),
    description: t('تجارب تعلم مخصصة مصممة لتتناسب مع أسلوبك الفريد، سرعتك، وأهدافك.'),
   },
  ],
 },
  currentFeatures = features[i18n.language];

 return (
  <main className='space-y-4 lg:space-y-20'>
   <h1 className='text-xl font-bold md:px-40 px-10'>{t('AboutUs')}</h1>

   <section data-aos-duration="1000" data-aos-delay="1000" data-aos="fade-up" className='md:px-40 px-10'>
    <article className='my-10 space-y-10 md:px-1'>
     <h1 className='text-xl font-bold'>{t('AboutOur')}</h1>
     <img className='w-full h-[400px]' src={meeting} alt="meeting" />
    </article>
   </section>

   <section className='relative grid grid-cols-1 md:grid-cols-3'>
    <article data-aos="fade-right" data-aos-duration="1000" className="mb-10 relative z-10 md:m-0">
     <img src={group} className={`md:top-28 lg:top-12 md:pr-10 hidden px-1 md:block absolute w-full ${show ? 'h-60' : 'h-80'} ${rotation1}`} alt="Meeting" />
    </article>

    <div className="ps-12 lg:ps-20 col-span-2">
     <article data-aos="fade-left" data-aos-duration="1000" className='space-y-6 text-[var(--LightTxt)] bg-[var(--Light)] p-8 md:pl-20 md:m-0 md:pr-28 rounded-s-4xl'>
      <h1 className='text-xl md:text-2xl font-bold'>{t('AcademyBackground')}</h1>
      <h3 className='font-bold'>{t('OurJourney')}</h3>
      <p className='w-full lg:w-3/4'>
       {t('acadback')}
      </p>
      <section className={`my-3 space-y-3 ${show}`}>
       <h1 className='text-lg font-bold'>{t('OurAchievements')}</h1>
       <p className='w-full lg:w-3/4'>{t('OurAchievementsDescription')}</p>
      </section>
      <div className={`flex justify-end ${btn_pos}`}>
       <button onClick={() => show == "" ? setShow("hidden") : setShow("")} className='p-4 text-black rounded-4xl bg-[var(--Yellow)] transition-colors'>
        {show ? t('ExploreMore') : t('ExploreLess')}
       </button>
      </div>
     </article>
    </div>

   </section>

   <section className='relative grid grid-cols-1 lg:grid-cols-3'>
    <div className="pe-8 lg:pe-20 col-span-2">
     <article data-aos="fade-right" data-aos-duration="1000" className='space-y-6 text-[var(--LightTxt)] bg-[var(--Light)] p-8 md:pl-40 md:pr-40 rounded-e-4xl'>
      <h1 className='text-xl md:text-2xl font-bold'>{t('WhyWeAreUnique')}</h1>
      <h3 className='text-lg font-bold'>{t('ExpertGuidance')}</h3>
      <p className='w-full lg:w-3/4 text-lg'>{t('Learn from certified instructors with years of experience.')}</p>
      <h3 className='text-lg font-bold'>{t('Tailored Learning')}</h3>
      <p className='w-full lg:w-3/4 text-lg'>{t('Courses customized to match your proficiency level and goals.')}</p>
      <section className={`my-3 space-y-3 ${show2}`}>
       <div className="space-y-3">
        <h3 className='text-lg font-bold'>{t('BilingualSupport')}</h3>
        <p className='w-full lg:w-3/4 text-lg'>{t('BilingualSupportDescription')}</p>
       </div>
       <div className="space-y-3">
        <h1 className='text-lg font-bold'>{t('FlexibleScheduling')}</h1>
        <p className='w-full lg:w-3/4 text-lg'>{t('FlexibleSchedulingDescription')}</p>
       </div>
      </section>
      <div className={`flex justify-end md:${btn_pos}`}>
       <button onClick={() => show2 == "" ? setShow2("hidden") : setShow2("")} className='p-4 text-black rounded-4xl bg-[var(--Yellow)] transition-colors'>
        {show2 ? t('ExploreMore') : t('ExploreLess')}
       </button>
      </div>
     </article>
    </div>

    <article data-aos="fade-left" data-aos-duration="1000" className="relative">
     <img src={light} className={`w-full h-full top-0 hidden lg:block absolute ${rotation2}`} alt="Meeting" />
    </article>
   </section>

   <section data-aos="fade-up" className='md:px-40 px-8 space-y-10 md:space-y-12'>
    <h1 className='text-2xl md:text-3xl mb-20 lg:mb-48 font-bold text-center'>
     {t('OurTeachingApproach')}
    </h1>

    <div className="">
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:my-20 gap-4 md:gap-8 px-1.5">
      {currentFeatures.map((feature, index) => (
       <article data-aos="fade-up" data-aos-delay={feature.number * 100} key={index} className="bg-[var(--Light)] text-[var(--LightTxt)] p-4 rounded-3xl shadow-lg my-32  lg:my-0"
        style={{ marginTop: `-${feature.number * 30}px` }}>
        <p className="text-4xl font-bold mb-4 text-center">{feature.number}</p>
        <h2 className="text-xl md:text-2xl font-semibold mb-2 text-center">
         {feature.title}
        </h2>
        <p className="text-gray-600 text-center md:text-left">
         {feature.description}
        </p>
       </article>
      ))}
     </div>
    </div>
   </section>

   <section data-aos="fade-up" className='md:px-40 px-8 space-y-10'>
    <h1 className='font-bold text-2xl'>{t('MeetOurInstructors')}</h1>

    <article className="px-1.5">
     <div ref={sliderRef} className="keen-slider" dir="ltr">
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="100" className="keen-slider__slide">
       <Instructor pic={ins1} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="200" className="keen-slider__slide">
       <Instructor pic={ins2} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="300" className="keen-slider__slide">
       <Instructor pic={ins3} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="400" className="keen-slider__slide">
       <Instructor pic={ins4} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="500" className="keen-slider__slide">
       <Instructor pic={ins5} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600" className="keen-slider__slide">
       <Instructor pic={ins6} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="700" className="keen-slider__slide">
       <Instructor pic={ins7} name={t('aliwael')} />
      </div>
      <div data-aos="fade-up" data-aos-duration="2000" data-aos-delay="800" className="keen-slider__slide">
       <Instructor pic={ins8} name={t('aliwael')} />
      </div>
     </div>

     <div className="flex justify-between mt-4 space-x-4" dir="ltr">
      <button onClick={() => instanceRef.current?.prev()} className="p-2 text-black font-bold">
       <IoMdArrowBack />
      </button>
      <button onClick={() => instanceRef.current?.next()} className="p-2 text-black font-bold">
       <IoMdArrowForward />
      </button>
     </div>
    </article>
   </section>
  </main>
 );
}

export default AboutUs;