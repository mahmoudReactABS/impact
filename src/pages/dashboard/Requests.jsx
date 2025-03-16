import React, { useEffect, useState } from 'react';
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { db, collection, doc, addDoc, deleteDoc } from '../../data/firebaseConfig';
import { query, onSnapshot } from 'firebase/firestore';
import { Modal } from 'react-responsive-modal';
import TimeKeeper from 'react-timekeeper';
import { Datepicker } from "flowbite-react";
import emailjs from "emailjs-com";

function Requests() {
    const [requests, setRequests] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const [time, setTime] = useState('12:00');
    const [date, setDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const [sorted, setSorted] = useState({ field: null, direction: 'asc' });

    useEffect(() => {
        const q = query(collection(db, 'Requests'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty) {
                alert('No Requests found');
            } else {
                const req = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setRequests(req);
            }
        }, (error) => {
            console.error('Error fetching Requests: ', error);
        });

        return () => unsubscribe();
    }, []);

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const filteredRequests = requests.filter((req) =>
        req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.phoneNumber.includes(searchQuery)
    );

    const handleSortChange = (field) => {
        setSorted((prev) => {
            const direction = prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc';
            return { field, direction };
        });
    };

    const sortedRequests = sorted.field
        ? [...filteredRequests].sort((a, b) => {
            if (a[sorted.field] > b[sorted.field]) return sorted.direction === 'asc' ? 1 : -1;
            if (a[sorted.field] < b[sorted.field]) return sorted.direction === 'asc' ? -1 : 1;
            return 0;
        })
        : filteredRequests;

    const submitData = async () => {
        if (!date || !time || !selectedRequestId) {
            alert('Please select a date and time.');
            return;
        }

        try {
            const selectedRequest = requests.find((req) => req.id === selectedRequestId);

            let requestData = {
                name: selectedRequest.name,
                email: selectedRequest.email,
                phoneNumber: selectedRequest.phoneNumber,
                country: selectedRequest.country,
                date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
                time: time
            };

            if (selectedRequest.option === 'Course Reservation') {
                requestData = {
                    ...requestData,
                    courseCategory: selectedRequest.courseCategory,
                    courseType: selectedRequest.courseType,
                    courseOption: selectedRequest.courseOption,
                    takenTest: selectedRequest.takenTest,
                };
            }

            await addDoc(collection(db, selectedRequest.option), requestData);

            const requestRef = doc(db, 'Requests', selectedRequestId);
            await deleteDoc(requestRef);

            const updatedRequests = requests.filter((req) => req.id !== selectedRequestId);
            setRequests(updatedRequests);

            const emailParams = {
                name: selectedRequest.name,
                email: selectedRequest.email,
                phoneNumber: selectedRequest.phoneNumber,
                country: selectedRequest.country,
                date: requestData.date,
                time: requestData.time,
                option: selectedRequest.option,
            };

            emailjs.send('service_jvstoib', 'template_7u85sv9', emailParams, 'IBLrUOZvZy3lUUP5l').then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Error sending email:', error.text);
            });

            setOpenModal(false);
            window.scroll(0, 0);

        } catch (e) {
            console.error('Error processing request: ', e);
            alert('Failed to process the request.');
        }
    };

    return (
        <main className="space-y-10">
            <h1 className="font-bold text-2xl">Students Requests</h1>

            <section className="flex items-center justify-start space-x-8">
                <form className="inline-block w-[40%] bg-[var(--Light)]/95 p-2 rounded-xl">
                    <input type="search" placeholder="Search by name or phone" className="w-full p-2 bg-transparent border-0 focus:outline-0" value={searchQuery} onChange={handleSearchChange} />
                </form>

                <div className="relative inline-block text-left">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-2xl p-4 rounded-xl bg-[var(--Yellow)] text-black focus:outline-none">
                        <HiMiniAdjustmentsHorizontal />
                    </button>
                    {isOpen && (
                        <div className="absolute -right-20 mt-2 w-fit rounded-lg border-2 border-[var(--Yellow)] shadow-lg bg-[var(--Input)]">
                            <div className="w-full">
                                <button onClick={() => handleSortChange('name')} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                                    Name
                                </button>
                                <hr />
                                <button onClick={() => handleSortChange('country')} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                                    Country
                                </button>
                                <hr />
                                <button onClick={() => handleSortChange('option')} className="w-full px-4 py-2 text-[var(--SubText)] hover:bg-[var(--Yellow)]/50">
                                    Option
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="overflow-hidden border-2 border-[#347792] rounded-xl">
                {sortedRequests.length > 0 ? (
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
                            {sortedRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-100">
                                    <td className="p-4">{req.name}</td>
                                    <td className="p-4">{req.email}</td>
                                    <td className="p-4">{req.phoneNumber}</td>
                                    <td className="p-4">{req.country}</td>
                                    <td className="p-4">{req.option}</td>
                                    <td className="p-4">
                                        <button className="underline text-[var(--Yellow)]" onClick={() => { setSelectedRequestId(req.id); setOpenModal(true); }}>
                                            Select Date
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <h2 className='py-8 text-4xl font-semibold text-center'>No Requests Available</h2>}
            </section>

            <Modal open={openModal} onClose={() => setOpenModal(false)} center styles={{ modal: { borderRadius: '1rem', maxWidth: '42rem', width: '100%' } }}>
                <h2 className="my-12 text-3xl font-bold">Choose Date & Time</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center items-start drop-shadow-lg">
                        <Datepicker dateFormat="dd/MM/yyyy" minDate={new Date()} inline value={date} onChange={(newDate) => setDate(newDate)}
                            theme={{
                                root: { base: "p-3 h-full w-full focus:outline-none focus:ring-2 focus:ring-[var(--Main)]" },
                                popup: { footer: { base: "mt-2 flex space-x-2", button: { today: "bg-[var(--Main)] text-white" }, }, },
                                views: { days: { items: { item: { selected: "bg-[var(--Yellow)] text-white" } } } }
                            }} />
                    </div>

                    <div className="p-4 drop-shadow-lg">
                        <TimeKeeper time={time} onChange={(newTime) => setTime(newTime.formatted24)} switchToMinuteOnHourSelect={true} />
                    </div>
                </div>

                <div className="flex justify-between my-8">
                    <button className="px-8 py-2 rounded-xl border-2 border-[var(--Yellow)]" onClick={() => setOpenModal(false)}>
                        Cancel
                    </button>
                    <button className="px-8 py-2 rounded-xl bg-[var(--Yellow)]" onClick={submitData}>
                        Submit
                    </button>
                </div>
            </Modal>
        </main>
    );
}

export default Requests;
