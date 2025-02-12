import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { GiTeacher } from "react-icons/gi";

import Option from '../Components/Option';
import data from '../data/Courses.json';

const courses = data;

function CourseDetails() {
  const { i18n } = useTranslation();
  const { courseName } = useParams();
  const currentLanguage = i18n.language;

  const course = courses[courseName]?.[currentLanguage];

  if (!course) {
    return <div>{currentLanguage === 'en' ? 'Course not found' : 'الدورة غير موجودة'}</div>;
  }

  return (
    <main className="px-10 md:px-40 space-y-12">
      <h1 className="text-2xl font-bold mt-5">{currentLanguage === 'en' ? 'Course Details' : 'تفاصيل الدورة'}</h1>

      <section className="space-y-6">
        <h2 data-aos="fade-left" className="text-xl font-bold text-[var(--Yellow)]">{course.title}</h2>
        <p data-aos="fade-left" data-aos-delay="50" className="md:text-lg px-4">{course.description}</p>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-bold">{currentLanguage === 'en' ? 'Course Highlights' : 'أبرز النقاط في الدورة'}</h2>

        <ul className="list-none text-xl ml-6 space-y-4">
          <li data-aos="fade-left" data-aos-delay="100" key="student">
            <div className="flex gap-7 items-center">
              <IoPersonSharp className="text-[var(--Main)] text-2xl" aria-label="Student" /> {course.studentNo}
            </div>
          </li>
          <li data-aos="fade-left" data-aos-delay="200" key="level-assessment">
            <div className="flex gap-7 items-center">
              <FaChartLine className="text-[var(--Main)] text-2xl" aria-label="Level Assessment" /> {currentLanguage === 'en' ? 'Level Assessment' : 'تقييم المستوى'}
            </div>
          </li>
          <li data-aos="fade-left" data-aos-delay="300" key="live-sessions">
            <div className="flex gap-7 items-center">
              <GiTeacher className="text-[var(--Main)] text-2xl" aria-label="Live Sessions" /> {currentLanguage === 'en' ? 'Live Sessions' : 'جلسات مباشرة'}
            </div>
          </li>
          <li data-aos="fade-left" data-aos-delay="400" key="weekly-conversation">
            <div className="flex gap-7 items-center">
              <FaCalendarAlt className="text-[var(--Main)] text-2xl" aria-label="Weekly Conversation Classes" /> {currentLanguage === 'en' ? 'Weekly Conversation Classes' : 'دروس محادثة أسبوعية'}
            </div>
          </li>
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="text-xl font-bold">{currentLanguage === 'en' ? 'Options' : 'الخيارات'}</h2>

        <article className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {course.Options.map((opt) => (
            <Option
              key={opt.id}
              number={opt.id}
              levelno={opt.levelno}
              priceBefore={opt.priceBefore}
              priceAfter={opt.priceAfter}
              duration={opt.duration}
              totalTime={opt.totalTime}
              sessionPerWeek={opt.sessionPerWeek}
              Hours={opt.Hours}
              scheduleType={opt.scheduleType}
              courseCategory={courseName === 'ILETS' ? 'ILETS' : 'general'}
              option={courseName != 'ILETS' && courseName}
            />
          ))}
        </article>
      </section>
    </main>
  );
}

export default CourseDetails;