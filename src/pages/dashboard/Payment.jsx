import React, { useEffect, useState } from 'react';
import { db, collection, query, onSnapshot } from '../../data/firebaseConfig';
import { HiMiniAdjustmentsHorizontal } from 'react-icons/hi2';

function Payment() {
  const [payment, setPayment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorted, setSorted] = useState({ field: null, direction: 'asc' });
  const [isOpen, setIsOpen] = useState(false);

  // Real-time updates from Firestore using onSnapshot
  useEffect(() => {
    const q = query(collection(db, 'Payments'));
    
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (querySnapshot.empty) {
        alert('No Payments found');
      } else {
        const req = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPayment(req); 
      }
    }, (error) => {
      console.error('Error fetching Payments: ', error);
    });


    return () => unsubscribe();
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value.trim());

  const filteredData = payment.filter((req) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    return (
      req.name.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.phoneNumber?.includes(searchQuery) ||
      req.email?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.courseCategory?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.courseOption?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.courseType?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.paymentMethod?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.date?.toLowerCase().includes(lowerCaseSearchQuery) ||
      req.time?.toLowerCase().includes(lowerCaseSearchQuery)
    );
  });

  const sortedPayments = sorted.field
    ? [...filteredData].sort((a, b) => {
        if (a[sorted.field] > b[sorted.field]) return sorted.direction === 'asc' ? 1 : -1;
        if (a[sorted.field] < b[sorted.field]) return sorted.direction === 'asc' ? -1 : 1;
        return 0;
      })
    : filteredData;

  const handleSortChange = (field) => {
    setSorted((prev) => {
      const direction = prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc';
      return { field, direction };
    });
    setIsOpen(false);
  };

  return (
    <main className="space-y-10">
      <h1 className="font-bold text-2xl">Payments</h1>

      {/* Search bar */}
      <section className="flex items-center justify-start space-x-8">
        <form className="inline-block w-[40%] bg-[var(--Light)]/95 p-2 rounded-xl">
          <input type="search" placeholder="Search by name or phone"
            className="w-full p-2 bg-transparent border-0 focus:outline-0" value={searchQuery} onChange={handleSearchChange} />
        </form>

        {/* Sort Dropdown */}
        <div className="relative inline-block text-left">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl p-4 rounded-xl bg-[var(--Yellow)] text-black focus:outline-none">
            <HiMiniAdjustmentsHorizontal />
          </button>
          {isOpen && (
            <div className="absolute -right-20 mt-2 w-fit rounded-lg border-2 border-[var(--Yellow)] shadow-lg bg-[var(--Input)]">
              <div className="w-full">
                {[{ name: 'Name', act: 'name' }, { name: 'Email', act: 'email' }, { name: 'Course Category', act: 'courseCategory' }, { name: 'Course Option', act: 'courseOption' }, { name: 'Course Type', act: 'courseType' }, { name: 'Payment Method', act: 'paymentMethod' }, { name: 'Date', act: 'date' }].map((field) => (
                  <React.Fragment key={field.name}>
                    <button onClick={() => handleSortChange(field.act)} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                      {field.name}
                    </button>
                    <hr />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Payments Table */}
      <section className="overflow-hidden border-2 border-[#347792] rounded-xl">
        {sortedPayments.length > 0 ? (
          <table className="w-full text-center table-auto">
            <thead className="bg-[var(--Light)] text-[var(--SubText)] text-lg ">
              <tr>
                {['Name', 'Email', 'Course Category', 'Course Option', 'Course Type', 'Money', 'Payment Method', 'Date', 'Time'].map((header) => (
                  <th key={header} className="p-4">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody className=''>
              {sortedPayments.map((req) => (
                <tr key={req.id} className="hover:bg-gray-100">
                  <td className="p-4">{req.name}</td>
                  <td className="p-4">{req.email}</td>
                  <td className="p-4">{req.courseCategory}</td>
                  <td className="p-4">{req.courseOption}</td>
                  <td className="p-4">{req.courseType}</td>
                  <td className="p-4">{req.money}</td>
                  <td className="p-4">{req.paymentMethod}</td>
                  <td className="p-4">{req.date}</td>
                  <td className="p-4">{req.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="py-8 text-4xl font-semibold text-center">No Payments Available</h2>
        )}
      </section>
    </main>
  );
}

export default Payment;
