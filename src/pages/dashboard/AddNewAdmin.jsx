import React, { useState } from 'react';
import newPho from '../../assets/ins4.png';
import { db, collection, addDoc } from '../../data/firebaseConfig';
import { query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { toast } from "react-hot-toast";

function AddNewAdmin() {
 const [formData, setFormData] = useState({
  Name: '',
  Email: '',
  Phone: '',
  Password: '',
  Previlige: 'Admin'
 }),
  navigate = useNavigate();

 const handleChange = (e) => {
  const { name, value, } = e.target;
  setFormData((prevState) => ({ ...prevState, [name]: value }));
 };

 const AddAdmin = async (e) => {
  e.preventDefault();

  if (!formData.Name || !formData.Email || !formData.Phone || !formData.Password || !formData.Previlige) {
   Swal.fire({ icon: 'error', title: 'Error', text: 'Please Fill All Fields', timer: 1000, showConfirmButton: false, });
   return;
  }

  try {
   const q1 = query(collection(db, 'Admins'), where('Name', '==', formData.Name));
   const q2 = query(collection(db, 'Admins'), where('Phone', '==', formData.Phone));
   const q3 = query(collection(db, 'Admins'), where('Email', '==', formData.Email));

   const [querySnapshot1, querySnapshot2, querySnapshot3] = await Promise.all([
    getDocs(q1),
    getDocs(q2),
    getDocs(q3),
   ]);

   if (!querySnapshot1.empty || !querySnapshot2.empty || !querySnapshot3.empty) {
    Swal.fire({ icon: 'error', title: 'Error', text: 'User Already Exists', timer: 1000, showConfirmButton: false, });
    return;
   }

   await addDoc(collection(db, 'Admins'), { Name: formData.Name, Email: formData.Email, Password: formData.Password, Phone: formData.Phone, Previlige: formData.Previlige, });

   navigate('/dash/settings');

   Swal.fire({
    showCloseButton: true,
    title: 'successfully Added',
    timer: 1000,
    showConfirmButton: false
   });
   window.scroll(0, 0);
  } catch (error) {
   console.error('Error adding document: ', error);
   Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong. Please try again.', timer: 1000, showConfirmButton: false, });
  }
 };

 return (
  <main className="space-y-10">
   <h1 className="font-bold text-2xl">Settings</h1>

   <section className="space-y-6">
    <h2 className="font-semibold text-xl">Add Admin Account</h2>

    <form onSubmit={AddAdmin} className="space-y-4 grid grid-cols-4 shadow-2xl p-10">
     <article className="col-span-1 p-10 flex items-center justify-center">
      <img src={newPho} alt="Profile" />
     </article>

     <article className="col-span-3 space-y-3">
      <div className="space-y-4">
       <h4 className="font-semibold text-lg">Name</h4>
       <input onChange={handleChange} required name="Name" value={formData.Name} placeholder="Ahmed Ali" type="text" className="py-2 px-4 w-full rounded-lg bg-[var(--Input)]" />
      </div>

      <div className="space-y-4">
       <h4 className="font-semibold text-lg">Phone</h4>
       <input onChange={handleChange} required name="Phone" value={formData.Phone} placeholder="0123456789" type="tel" className="py-2 px-4 w-full rounded-lg bg-[var(--Input)]" />
      </div>

      <div className="space-y-4">
       <h4 className="font-semibold text-lg">Email</h4>
       <input onChange={handleChange} required name="Email" value={formData.Email} placeholder="1234@gmail.com" type="email" className="py-2 px-4 w-full rounded-lg bg-[var(--Input)]" />
      </div>

      <div className="space-y-4">
       <h4 className="font-semibold text-lg">Password</h4>
       <input onChange={handleChange} required name="Password" value={formData.Password} placeholder="********" type="password" className="py-2 px-4 w-full rounded-lg bg-[var(--Input)]" />
      </div>

      <div className="space-y-4">
       <h4 className="font-semibold text-lg">Previlige</h4>
       <select required name="Previlige" value={formData.Previlige} onChange={handleChange} className="py-2 px-4 w-full rounded-lg bg-[var(--Input)]">
        <option value="Admin">Admin</option>
        <option value="Other">Other</option>
       </select>
      </div>
     </article>
    </form>

    <article className="flex justify-end w-full">
     <button onClick={AddAdmin} type="submit" className="py-3 px-20 text-xl rounded-2xl bg-[var(--Yellow)]">
      Save
     </button>
    </article>
   </section>
  </main>
 );
}

export default AddNewAdmin;
