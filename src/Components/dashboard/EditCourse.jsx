import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, doc, getDoc, updateDoc } from "../../data/firebaseConfig";
import Swal from 'sweetalert2';

function EditCourse() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = ["Group", "Private", "IELTS"];

  const courseId = location.state?.courseId;
  const activeTab = location.state?.tab;
  const levelId = location.state?.levelId;

  const [courseData, setCourseData] = useState(null);

  const [priceBefore, setPriceBefore] = useState('');
  const [priceAfter, setPriceAfter] = useState('');
  const [sessionNo, setSessionNo] = useState('');
  const [totalTimeNo, setTotalTimeNo] = useState('');
  const [totalTimeUnit, setTotalTimeUnit] = useState('Weeks');
  const [totalTimeUnitAr, setTotalTimeUnitAr] = useState('أسبوع');
  const [sessionPerWeek, setSessionPerWeek] = useState('');
  const [hours, setHours] = useState('');
  const [scheduleType, setScheduleType] = useState('');
  const [scheduleTypeAr, setScheduleTypeAr] = useState('');
  const [levelno, setLevelno] = useState('');
  const [levelnoAr, setLevelnoAr] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCourseData(data);

          if (data.en && data.ar && data.en.Options?.length > 0 && data.ar.Options?.length > 0) {
            const selectedLevel = data.en.Options.find(option => option.id === levelId);
            const selectedLevelAr = data.ar.Options.find(option => option.id === levelId);

            if (selectedLevel && selectedLevelAr) {
              const [ttNo, ttUnit] = selectedLevel.totalTime.split(" ");
              const [ttNoAr, ttUnitAr] = selectedLevelAr.totalTime.split(" ");

              setPriceBefore(selectedLevel.priceBefore || '');
              setPriceAfter(selectedLevel.priceAfter || '');
              setSessionNo(selectedLevel.duration || '');
              setTotalTimeNo(ttNo || '');
              setTotalTimeUnit(ttUnit || 'Weeks');
              setSessionPerWeek(selectedLevel.sessionPerWeek || '');
              setHours(selectedLevel.Hours || '');
              setScheduleType(selectedLevel.scheduleType || '');
              setTotalTimeUnitAr(ttUnitAr || 'أسبوع');
              setScheduleTypeAr(selectedLevelAr.scheduleType || '');
              setLevelno(selectedLevel.levelno || '');
              setLevelnoAr(selectedLevelAr.levelno || '');
            }
          }
        } else {
          console.error("No such course found");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId, levelId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!priceBefore || !priceAfter || !sessionNo || !totalTimeNo || !totalTimeUnit || !sessionPerWeek || !scheduleType || !levelno) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Please Fill All Fields', timer: 1000, showConfirmButton: false });
      return;
    }

    try {
      const courseRef = doc(db, "courses", courseId);

      const totalTime = `${totalTimeNo} ${totalTimeUnit}`;
      const totalTimeAr = `${totalTimeNo} ${totalTimeUnitAr}`;

      const updatedEnOptions = courseData.en.Options.map(option =>
        option.id === levelId
          ? { ...option, priceBefore, priceAfter, duration: sessionNo, totalTime, sessionPerWeek, Hours: hours, scheduleType, levelno }
          : option
      );

      const updatedArOptions = courseData.ar.Options.map(option =>
        option.id === levelId
          ? { ...option, priceBefore, priceAfter, duration: sessionNo, totalTime: totalTimeAr, sessionPerWeek, Hours: hours, scheduleType: scheduleTypeAr, levelno: levelnoAr }
          : option
      );

      await updateDoc(courseRef, { "en.Options": updatedEnOptions, "ar.Options": updatedArOptions });

      Swal.fire({ icon: 'success', title: 'Updated!', text: 'Course details updated successfully.', timer: 1500, showConfirmButton: false });

      setTimeout(() => {
        navigate('/dash/courses');
      }, 1500);

    } catch (error) {
      console.error("Error updating course: ", error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong. Please try again.', timer: 1000, showConfirmButton: false });
    }
  };

  return (
    <main className='space-y-10'>
      <section className="flex justify-start space-x-16 text-center">
        {tabs.map((tab) => (
          <p key={tab} className={`pb-2 p-6 w-28 px-0 font-semibold text-xl ${activeTab === tab && "border-b-2 border-[var(--Yellow)] text-[var(--Yellow)]"}`}>
            {tab}
          </p>
        ))}
      </section>

      <form onSubmit={handleUpdate} className='space-y-10'>
        {/* English Part */}
        <section className='grid grid-cols-2 gap-x-8 space-y-6'>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Price Before</h3>
            <input value={priceBefore} type='number' onChange={e => setPriceBefore(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Price After</h3>
            <input value={priceAfter} type='number' onChange={e => setPriceAfter(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Number of Sessions</h3>
            <input value={sessionNo} type='number' onChange={e => setSessionNo(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' required />
          </article>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Duration</h3>
            <div className="grid grid-cols-2 space-x-4">
              <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeNo} onChange={(e) => setTotalTimeNo(e.target.value)} required>
                <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
                <option value={4}>4</option><option value={5}>5</option><option value={6}>6</option>
              </select>
              <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeUnit} onChange={(e) => setTotalTimeUnit(e.target.value)} required>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
              </select>
            </div>
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Sessions Per Week</h3>
            <input value={sessionPerWeek} type='text' onChange={e => setSessionPerWeek(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Hours Per Session</h3>
            <input value={hours} type='number' onChange={e => setHours(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' required />
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Schedule</h3>
            <input value={scheduleType} type='text' onChange={e => setScheduleType(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>Level Number</h3>
            <input value={levelno} type='text' onChange={e => setLevelno(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>
        </section>

        {/* Arabic Part */}
        <section className='grid grid-cols-2 gap-x-8 space-y-6' dir='rtl'>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>السعر قبل</h3>
            <input value={priceBefore} type='number' onChange={e => setPriceBefore(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>السعر بعد</h3>
            <input value={priceAfter} type='number' onChange={e => setPriceAfter(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>عدد الجلسات</h3>
            <input value={sessionNo} type='number' onChange={e => setSessionNo(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' required />
          </article>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>المدة</h3>
            <div className="grid grid-cols-2 space-x-4">
              <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeNo} onChange={(e) => setTotalTimeNo(e.target.value)} required>
                <option value={1}>1</option><option value={2}>2</option><option value={3}>3</option>
                <option value={4}>4</option><option value={5}>5</option><option value={6}>6</option>
              </select>
              <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeUnitAr} onChange={(e) => setTotalTimeUnitAr(e.target.value)} required>
                <option value="أسبوع">أسبوع</option>
                <option value="أسابيع">أسابيع</option>
                <option value="شهر">شهر</option>
                <option value="أشهر">أشهر</option>
              </select>
            </div>
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>الجلسات فى الإسبوع</h3>
            <input value={sessionPerWeek} type='text' onChange={e => setSessionPerWeek(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>
          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>مدة الجلسة</h3>
            <input value={hours} type='number' onChange={e => setHours(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' required />
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>الجدول</h3>
            <input value={scheduleTypeAr} type='text' onChange={e => setScheduleTypeAr(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>

          <article className='space-y-2'>
            <h3 className='font-bold text-lg'>عدد المراحل</h3>
            <input value={levelnoAr} type='text' onChange={e => setLevelnoAr(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
          </article>
        </section>

        <div className="flex justify-between items-center text-xl">
          <button type="button" onClick={() => navigate('/dash/courses')} className="px-20 py-4 shadow-md rounded-xl border-2 border-[var(--Yellow)]">
            Cancel
          </button>
          <button type="submit" className="px-20 py-4 shadow-md rounded-xl bg-[var(--Yellow)]">
            Save
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditCourse;