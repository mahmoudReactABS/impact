import React, { useEffect, useState } from 'react';
import Course from '../Components/Course';
import { useTranslation } from 'react-i18next';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebaseConfig';

function Courses() {
  const { t, i18n } = useTranslation();
  const [courses, setCourses] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "courses");
        const courseSnapshot = await getDocs(coursesCollection);
        const courseData = {};

        courseSnapshot.forEach((doc) => {
          courseData[doc.id] = doc.data();
        });

        setCourses(courseData);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className='px-10 md:px-60'>
      <h1 data-aos="fade-up" className='font-bold text-3xl py-5 mb-8'>{t('ourcorses')}</h1>

      <article data-aos="fade-up" data-aos-delay="600" className='grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-8'>
        {/* Check if courses data is loaded */}
        {courses.IELTS && (
          <Course title={t('courses.ielts')} direc='IELTS' courseData={courses.IELTS} />
        )}
        {courses.Group && (
          <Course title={t('courses.group')} direc='Group' courseData={courses.Group} />
        )}
        {courses.Private && (
          <Course title={t('courses.private')} direc='Private' courseData={courses.Private} />
        )}
      </article>
    </section>
  );
}

export default Courses;
