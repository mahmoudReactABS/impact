import React, { useEffect, useState } from 'react';
import { HiMiniAdjustmentsHorizontal } from 'react-icons/hi2';
import { db, collection } from '../../data/firebaseConfig';
import { query, getDocs } from 'firebase/firestore';

function StudentsBooking() {
  const [requests, setRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedButton, setSelectedButton] = useState('Free Session');
  const [isOpen, setIsOpen] = useState(false);
  const [sorted, setSorted] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredRequests = requests.filter((req) =>
    req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.phoneNumber.includes(searchQuery)
  );

  const sortedRequests = sorted ? [...filteredRequests].sort((a, b) => {
    let comparison = 0;
    if (a[sorted] > b[sorted]) {
      comparison = 1;
    } else if (a[sorted] < b[sorted]) {
      comparison = -1;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  }) : filteredRequests;

  const buttons = [{ name: "Courses", fill: "Course Reservation" }, { name: "Free Test", fill: "Free Test" }, { name: "Free Session", fill: "Free Session" }];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(collection(db, selectedButton));
        const querySnapshot = await getDocs(q);
        const req = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRequests(req);

        req.map(req => console.log(req.takenTest));
      } catch (e) {
        console.error('Error fetching Requests: ', e);
      }
    };

    fetchRequests();
  }, [selectedButton]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleButtonClick = (buttonName) => setSelectedButton(buttonName);

  const handleSortChange = (field) => {
    if (sorted === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSorted(field);
      setSortDirection('asc');
    }
  };

  return (
    <main className="space-y-10">
      <h1 className="font-bold text-2xl">Students Bookings</h1>
      <section className="flex items-center justify-start space-x-8">
        <form className="inline-block w-[40%] bg-[var(--Light)]/95 p-2 rounded-xl">
          <input type="search" placeholder="Search by name or phone"
            className="w-full p-2 bg-transparent border-0 focus:outline-0"
            value={searchQuery} onChange={handleSearchChange} />
        </form>
        <div className="relative inline-block text-left">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl p-4 rounded-xl bg-[var(--Yellow)] text-black focus:outline-none">
            <HiMiniAdjustmentsHorizontal />
          </button>
          {isOpen && (
            <div className="absolute -right-20 mt-2 w-fit rounded-lg border-2 border-[var(--Yellow)] shadow-lg bg-[var(--Input)]">
              <div className="w-full">
                <button onClick={() => handleSortChange("name")} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                  Name
                </button>
                <hr />
                <button onClick={() => handleSortChange("country")} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                  Country
                </button>
                <hr />
                <button onClick={() => handleSortChange("date")} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                  Date
                </button>
                <hr />
                <button onClick={() => handleSortChange("time")} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                  Time
                </button>
                <hr />
                <button onClick={() => handleSortChange("course Category")} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                  Course Category
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <h1 className="font-bold text-2xl">{selectedButton}</h1>

      <section className="flex justify-start space-x-14 text-lg">
        {buttons.map((btn) => (
          <button key={btn.fill} className={`px-12 py-4 rounded-xl ${selectedButton !== btn.fill ? 'border-2 border-[var(--Yellow)]' : 'bg-[var(--Yellow)]'}`}
            onClick={() => handleButtonClick(btn.fill)}>
            {btn.name}
          </button>
        ))}
      </section>

      <section className="overflow-hidden border-2 border-[#347792] rounded-xl">
        {sortedRequests.length > 0 ? (
          selectedButton === 'Course Reservation' ? (
            <table className="w-full text-center table-auto">
              <thead className="bg-[var(--Light)] text-[var(--SubText)] text-xl">
                <tr>
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Option</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Test</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {sortedRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-100">
                    <td className="p-4">{req.name}</td>
                    <td className="p-4">{req.email}</td>
                    <td className="p-4">{req.phoneNumber}</td>
                    <td className="p-4">{req.country}</td>
                    <td className="p-4">{req.courseCategory}</td>
                    <td className="p-4">{req.courseOption}</td>
                    <td className="p-4">{req.courseType}</td>
                    {!req.takenTest ?
                      <td className='p-4 text-[var(--Yellow)] '>No</td> :
                      <td className='p-4'>Yes</td>
                    }
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
                {sortedRequests.map((req) => (
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
