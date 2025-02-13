import React from 'react'
import AdminProfile from '../../Components/dashboard/AdminProfile'
import OtherAdmin from '../../Components/dashboard/OtherAdmin'
function Settings() {
 return (
  <main className='space-y-10'>
   <h1 className='font-bold text-2xl'>Settings</h1>

   <section className='space-y-4'>
    <h3 className='font-bold text-xl'>Profile</h3>

    <AdminProfile />
   </section>

   <section className='space-y-4'>
    <article className='flex justify-between items-center'>
     <h3 className='font-bold text-xl'>Other Admins</h3>
     <button type="submit" className="p-3 rounded-xl bg-[var(--Yellow)]">
      Add New Admin
     </button>
    </article>

    <OtherAdmin />
    <OtherAdmin />
    <OtherAdmin />
   </section>
  </main>
 )
}

export default Settings
