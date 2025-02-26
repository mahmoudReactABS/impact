import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from "../../data/firebaseConfig"; 
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';

function AddCourse() {
 const location = useLocation();
 const navigate = useNavigate();

 const activeTab = location.state?.tab;

 const tabs = ["Group", "Private", "IELTS"];

 const [levelno, setLevelno] = useState("");
 const [levelnoAr, setlevelnoAr] = useState("");
 const [priceBefore, setPriceBefore] = useState("");
 const [priceAfter, setPriceAfter] = useState("");
 const [totalTimeNo, setTotalTimeNo] = useState("");
 const [totalTimeUnit, setTotalTimeUnit] = useState("");
 const [totalTimeUnitAr, setTotalTimeUnitAr] = useState("");
 const [sessionPerWeek, setSessionPerWeek] = useState("");
 const [sessionNo, setSessionNo] = useState("");
 const [hours, setHours] = useState("");
 const [scheduleType, setScheduleType] = useState("");
 const [scheduleTypeAr, setScheduleTypeAr] = useState("");

 const handleAddCourse = async (e) => {
  e.preventDefault();

  if (!levelno || !levelnoAr || !priceBefore || !priceAfter || !totalTimeNo || !totalTimeUnit || !totalTimeUnitAr || !sessionPerWeek || !sessionNo || !hours || !scheduleType || !scheduleTypeAr) {
   Swal.fire({ icon: 'error', title: 'Error', text: 'Please Fill All Fields', timer: 1000, showConfirmButton: false });
   return;
  }

  try {
   const q1 = query(collection(db, 'Courses'), where('Name', '==', levelno));
   const q2 = query(collection(db, 'Courses'), where('NameAr', '==', levelnoAr));

   const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

   if (!querySnapshot1.empty || !querySnapshot2.empty) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'Course Already Exists', timer: 1000, showConfirmButton: false });
    return;
   }

   // Add the new course to the Courses collection
   const newCourseRef = await addDoc(collection(db, 'courses'), {
    Name: levelno,
    NameAr: levelnoAr,
    PriceBefore: priceBefore,
    PriceAfter: priceAfter,
    TotalTimeNo: totalTimeNo,
    TotalTimeUnit: totalTimeUnit,
    TotalTimeUnitAr: totalTimeUnitAr,
    SessionPerWeek: sessionPerWeek,
    SessionNo: sessionNo,
    Hours: hours,
    ScheduleType: scheduleType,
    ScheduleTypeAr: scheduleTypeAr,
   });

   deleteDoc(newCourseRef);

   if (activeTab) {
    const courseRef = doc(db, 'courses', activeTab);

    const newOptionEn = {
     id: newCourseRef.id,
     levelno,
     priceBefore,
     priceAfter,
     duration: totalTimeNo,
     totalTime: `${totalTimeNo} ${totalTimeUnit}`,
     sessionPerWeek,
     Hours: hours,
     scheduleType,
    };

    const newOptionAr = {
     id: newCourseRef.id,
     levelno: levelnoAr,
     priceBefore,
     priceAfter,
     duration: totalTimeNo,
     totalTime: `${totalTimeNo} ${totalTimeUnitAr}`,
     sessionPerWeek,
     Hours: hours,
     scheduleType: scheduleTypeAr,
    };

    await updateDoc(courseRef, { 'en.Options': arrayUnion(newOptionEn), 'ar.Options': arrayUnion(newOptionAr) });
   }
   navigate('/dash/courses');
  } catch (error) {
   console.error('Error adding course: ', error);
   Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong. Please try again.', timer: 1000, showConfirmButton: false });
  }
 };

 return (
  <main className='space-y-10'>
   <section className="flex justify-start text-center space-x-16">
    {tabs.map((tab) => (
     <p key={tab} className={`pb-2 p-6 w-28 px-0 font-semibold text-xl ${activeTab === tab && "border-b-2 border-[var(--Yellow)] text-[var(--Yellow)]"}`}>
      {tab}
     </p>
    ))}
   </section>

   <form className='space-y-10' onSubmit={handleAddCourse}>
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
      <input value={sessionNo} type='number' onChange={e => setSessionNo(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' />
     </article>
     <article className='space-y-2'>
      <h3 className='font-bold text-lg'>Duration</h3>
      <div className="grid grid-cols-2 space-x-4">
       <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeNo} onChange={(e) => setTotalTimeNo(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
       </select>
       <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeUnit} onChange={(e) => setTotalTimeUnit(e.target.value)}>
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
      <input value={hours} type='number' onChange={e => setHours(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' />
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
      <input value={sessionNo} type='number' onChange={e => setSessionNo(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' />
     </article>
     <article className='space-y-2'>
      <h3 className='font-bold text-lg'>المدة</h3>
      <div className="grid grid-cols-2 space-x-4">
       <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeNo} onChange={(e) => setTotalTimeNo(e.target.value)}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
       </select>
       <select className='bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' value={totalTimeUnitAr} onChange={(e) => setTotalTimeUnitAr(e.target.value)}>
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
      <input value={hours} type='number' onChange={e => setHours(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-0 py-2 px-4 rounded-lg' />
     </article>

     <article className='space-y-2'>
      <h3 className='font-bold text-lg'>الجدول</h3>
      <input value={scheduleTypeAr} type='text' onChange={e => setScheduleTypeAr(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
     </article>

     <article className='space-y-2'>
      <h3 className='font-bold text-lg'>عدد المراحل</h3>
      <input value={levelnoAr} type='text' onChange={e => setlevelnoAr(e.target.value)} className='w-full bg-[var(--Input)] focus:outline-none py-2 px-4 rounded-lg' required />
     </article>
    </section>

    <div className="flex justify-between items-center text-xl">
     <button onClick={() => navigate('/dash/courses')} className="px-20 py-4 shadow-md rounded-xl border-2 border-[var(--Yellow)]" >
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

export default AddCourse;