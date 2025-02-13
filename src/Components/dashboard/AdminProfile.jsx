import React from 'react'
import user from '../../assets/ins8.png'
import { FaEye } from 'react-icons/fa'
function AdminProfile() {
 return (
  <article className='grid grid-cols-8 p-8 gap-x-12 rounded-3xl bg-[var(--Light)]'>
   <sec className="col-span-1 flex items-center justify-center">
    <img src={user} className='h-28 w-full' />
   </sec>

   <sec className="col-span-7 grid grid-cols-3 space-y-5">
    <div className='w-full space-y-2'>
     <h4 className='text-md text-[var(--SubText)]'>Name</h4>
     <p className='text-2xl'>Sayed Eshta</p>
    </div>
    <div className='w-full space-y-2'>
     <h4 className='text-md text-[var(--SubText)]'>Phone</h4>
     <p className='text-2xl'>07775000</p>
    </div>
    <div className='w-full space-y-2'>
     <h4 className='text-md text-[var(--SubText)]'>Previlige</h4>
     <p className='text-2xl'>Admin</p>
    </div>
    <div className='w-full space-y-2'>
     <h4 className='text-md text-[var(--SubText)]'>Email</h4>
     <p className='text-2xl'>1234@gmail.com</p>
    </div>
    <div className='w-full space-y-2'>
     <h4 className='text-md text-[var(--SubText)]'>Password</h4>
     <div className="flex space-x-4 items-center">
      <p className='text-2xl'>********</p>
      <FaEye />
     </div>
    </div>
   </sec>
  </article>
 )
}

export default AdminProfile
