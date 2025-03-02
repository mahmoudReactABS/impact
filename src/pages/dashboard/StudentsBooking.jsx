import React, { useEffect, useState } from 'react';
import { HiMiniAdjustmentsHorizontal } from 'react-icons/hi2';
import { db, collection } from '../../data/firebaseConfig';
import { query, getDocs } from 'firebase/firestore';

function StudentsBooking() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedButton, setSelectedButton] = useState('Free Session');

  const filteredRequests = requests.filter((req) => req.name.toLowerCase().includes(searchQuery.toLowerCase()) || req.phoneNumber.includes(searchQuery));
  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const buttons = [{ name: "Courses" }, { name: "Free Test" }, { name: "Free Session" }];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(collection(db, selectedButton));
        const querySnapshot = await getDocs(q);

        const req = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
        setRequests(req);
      } catch (e) {
        console.error('Error fetching Requests: ', e);
      }
    };

    fetchRequests();
  }, [selectedButton]);

  const handleButtonClick = (button) => setSelectedButton(button);

  return (
    <main className="space-y-10">
      <h1 className="font-bold text-2xl">Students Bookings</h1>

      <section className="flex items-center justify-start space-x-8">
        <form className="inline-block w-[40%] bg-[var(--Light)]/95 p-2 rounded-xl">
          <input type="search" placeholder="Search by name or phone" className="w-full p-2 bg-transparent border-0 focus:outline-0" value={searchQuery} onChange={handleSearchChange} />
        </form>

        <button className="text-2xl p-4 rounded-xl bg-[var(--Yellow)]">
          <HiMiniAdjustmentsHorizontal />
        </button>
      </section>

      <h1 className="font-bold text-2xl">{selectedButton}</h1>

      <section className="flex justify-start space-x-14 text-lg">
        {
          buttons.map(btn => <button className={`px-12 py-4 rounded-xl 
        ${selectedButton !== btn.name ? 'border-2 border-[var(--Yellow)]' : 'bg-[var(--Yellow)]'}`}
            onClick={() => handleButtonClick(btn.name)}>{btn.name}</button>)
        }
      </section>

      <section className="overflow-hidden border-2 border-[#347792] rounded-xl">
        {filteredRequests.length > 0 ? (
          selectedButton === 'Courses' ? (
            <table className="w-full text-center table-auto">
              <thead className="bg-[var(--Light)] text-[var(--SubText)] text-xl">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Course Category</th>
                  <th className="p-4">Option</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Test</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-100">
                    <td className="p-4">{req.name}</td>
                    <td className="p-4">{req.email}</td>
                    <td className="p-4">{req.phoneNumber}</td>
                    <td className="p-4">{req.country}</td>
                    <td className="p-4">{req.category}</td>
                    <td className="p-4">{req.option}</td>
                    <td className="p-4">{req.type}</td>
                    <td className={"p-4" + req.test === 'no' && "text-[var(--Yellow)]"}>{req.test}</td>
                    <td className="p-4">{req.date}</td>
                    <td className="p-4">{req.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-center table-auto">
              <thead className="bg-[var(--Light)] text-[var(--SubText)] text-xl">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-100">
                    <td className="p-4">{req.name}</td>
                    <td className="p-4">{req.email}</td>
                    <td className="p-4">{req.phoneNumber}</td>
                    <td className="p-4">{req.country}</td>
                    <td className="p-4">{req.date}</td>
                    <td className="p-4">{req.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <h2 className="py-8 text-4xl font-semibold text-center">No {selectedButton} Booked</h2>
        )}
      </section>
    </main>
  );
}

export default StudentsBooking;
