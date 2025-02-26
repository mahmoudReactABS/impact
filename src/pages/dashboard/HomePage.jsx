import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../AdminContext';
import { db, collection } from '../../data/firebaseConfig';
import { query, getDocs } from 'firebase/firestore';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function HomePage() {
 const [freeTest,seetFreeTest]=useState();
 const [freeSession,seetFreeSession]=useState();

  useEffect(() => {
   const fetchRequests = async () => {
    try {
     const q = query(collection(db, 'Free Test'));
     const querySnapshot = await getDocs(q);
 
     const req = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
     }));
     seetFreeTest(req.length);
    } catch (e) {
     console.error('Error fetching Requests: ', e);
    }

    try {
     const q = query(collection(db, 'Free Session'));
     const querySnapshot = await getDocs(q);
 
     const req = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
     }));
     seetFreeSession(req.length);
    } catch (e) {
     console.error('Error fetching Requests: ', e);
    }
   };
   fetchRequests();
  }, []);

 const { admin } = useAdmin();

 const dataChart = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
  datasets: [
   {
    data: [125, 260, 125, 175, 125, 200, 222, 0, 0, 0],
    borderRadius: 50,
    borderWidth: 0,
    backgroundColor: '#F5D019',
    barThickness: 10,
   },
  ],
 };

 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
   legend: { display: false },
   tooltip: { mode: 'index', intersect: false },
  },
  scales: {
   x: { beginAtZero: false, grid: { display: false } },
   y: { beginAtZero: false, grid: { display: false } },
  },
 };

 const details = [
  { number: freeTest, description: "Free Test" },
  { number: freeSession, description: "Free Session" },
  { number: "350", description: "Total Student" },
  { number: "350", description: "Paid Courses" },
 ];

 return (
  <main className="w-full space-y-10">
   <section className="bg-[var(--Main)] text-white p-10 grid grid-cols-3 rounded-2xl">
    <article className="space-y-5 col-span-1">
     <h1 className="text-2xl font-bold">Dashboard Insights</h1>
     <p style={{ textAlign: 'justify' }} className="text-sm">
      Track the number of students who have taken free placement tests,
      attended free sessions, and enrolled in paid courses.
     </p>
    </article>

    <article className="grid grid-cols-4 gap-4 ps-4 col-span-2">
     {details.map((item, index) => (
      <div key={index} className="bg-[var(--Light)]/50 text-center p-5 rounded-2xl space-y-2">
       <h1 className="text-4xl text-[var(--Yellow)] font-bold">{item.number}</h1>
       <p className="text-md">{item.description}</p>
      </div>
     ))}
    </article>
   </section>

   <section className="grid grid-cols-2 space-x-10 rounded-2xl p-10 border-2 border-[var(--SubTextBorder)]/50">
    <article className="space-y-8 flex flex-col h-full">
     <h1 className="text-3xl font-bold">Monthly Enrollment Trends</h1>
     <p style={{ textAlign: 'justify' }}>
      Analyze student enrollment patterns throughout the year with a clear visual representation. This chart helps track growth, identify peak registration periods, and make data-driven decisions for future course offerings.
     </p>

     <div className="mt-auto justify-self-end space-y-2">
      <h1 className="text-3xl text-[var(--Yellow)] font-bold">250 Students</h1>
      <p>July 2024</p>
     </div>
    </article>

    <article className=''>
     <div style={{ height: '350px' }}>
      <Bar data={dataChart} options={options} />
     </div>
    </article>
   </section>

   <section className="space-y-10">
    <h1 className="text-2xl font-bold">Recent Students Requests</h1>

    <div className="overflow-hidden border-2 border-[#347792] rounded-xl">
     <table className="w-full text-center table-auto">
      <thead className="bg-[var(--Light)] text-[var(--SubText)] text-xl">
       <tr>
        <th className="p-4">Name</th>
        <th className="p-4">Email</th>
        <th className="p-4">Phone</th>
        <th className="p-4">Country</th>
        <th className="p-4">Option</th>
        <th className="p-4">Response</th>
       </tr>
      </thead>

      <tbody>
       <tr className="hover:bg-gray-100">
        <td className="p-4">Sayed</td>
        <td className="p-4">1234@gmail.com</td>
        <td className="p-4">0123456789</td>
        <td className="p-4">Egypt</td>
        <td className="p-4">Free Session</td>
        <td className="p-4">
         <button className="underline text-[var(--Yellow)]">select date</button>
        </td>
       </tr>
       <tr className="hover:bg-gray-100">
        <td className="p-4">John</td>
        <td className="p-4">john.doe@gmail.com</td>
        <td className="p-4">0987654321</td>
        <td className="p-4">USA</td>
        <td className="p-4">Free Session</td>
        <td className="p-4">
         <button className="underline text-[var(--Yellow)]">select date</button>
        </td>
       </tr>
       <tr className="hover:bg-gray-100">
        <td className="p-4">Maria</td>
        <td className="p-4">maria@gmail.com</td>
        <td className="p-4">0555555555</td>
        <td className="p-4">Spain</td>
        <td className="p-4">Free Session</td>
        <td className="p-4">
         <button className="underline text-[var(--Yellow)]">select date</button>
        </td>
       </tr>
      </tbody>
     </table>
    </div>
    <div className="flex px-6 py-0.5 justify-end">
     <Link to='/dash/requests' onClick={() => window.scroll(0, 0)} className="underline">See more</Link>
    </div>
   </section>
  </main>
 );
}

export default HomePage;