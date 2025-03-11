import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import bg from '../assets/bgcourses-Photoroom.png';
import { db } from '../data/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

function Course(props) {
 const [courses, setCourses] = useState(null);

 const { t, i18n } = useTranslation(),
  currentLanguage = i18n.language,
  navigate = useNavigate();

 useEffect(() => {
  const fetchCourse = async () => {
   try {
    const docRef = doc(db, "courses", props.direc);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
     const courseData = docSnap.data()?.[currentLanguage];
     setCourses(courseData);
    } else {
     console.log("No such document!");
    }
   } catch (error) {
    console.error("Error fetching course: ", error);
   }
  };

  fetchCourse();
 }, [currentLanguage, props.title]);

 if (!courses) {
  return <div>Loading...</div>;
 }

 return (
  <article className='text-center text-white space-y-10 bg-[var(--Main)]/90 rounded-4xl py-4 px-3 relative overflow-hidden'
   style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', }}>
   {/* Overlay */}
   <div className='absolute inset-0 bg-[var(--Main)]/90 h-full z-10'></div>

   {/* Content */}
   <div className='relative z-20 space-y-10'>
    <h1 className='text-3xl text-[var(--Yellow)] font-bold'>{props.title}</h1>
    <h3 className='text-2xl font-bold'>{t('liveSession.title')}</h3>

    <div className='space-y-8 text-md lg:text-xl'>
     <p>{courses?.Options && courses.Options[0]?.Hours && courses.Options[0].Hours} {t('liveSession.duration')}</p>
     <p>
      {courses?.Options && courses.Options[0]?.sessionPerWeek && `${courses.Options[0].sessionPerWeek} ${t('sessionsPerWeek')}`}
     </p>
     <p>
      {courses?.Options && courses.Options[0]?.scheduleType && courses.Options[0].scheduleType}
     </p>
    </div>

    <button onClick={() => { navigate(`/courses/${props.direc}`); window.scroll(0, 0); }} className='bg-white p-3 my-2 text-black rounded-4xl w-full'>
     {t('liveSession.moreDetails')}
    </button>
   </div>
  </article>
 );
}

export default Course;
