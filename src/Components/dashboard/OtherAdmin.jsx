import React from 'react'
import user from '../../assets/ins2.png'

const OtherAdmin = () => {
 return (
  <article className='border-2 border-[var(--SubTextBorder)] grid grid-cols-8 p-4 rounded-2xl'>
   <sec className="col-span-1">
    <img src={user} className='h-20 w-20' />
   </sec>

   <sec className="col-span-7 py-2 px-10 grid grid-cols-4">
    <div className='w-full space-y-2 flex-col items-center'>
     <h4 className='text-md text-[var(--SubText)]'>Name</h4>
     <p className='text-xl'>Sayed Eshta</p>
    </div>
    <div className='w-full space-y-2 flex-col items-center'>
     <h4 className='text-md text-[var(--SubText)]'>Phone</h4>
     <p className='text-xl'>07775000</p>
    </div>
    <div className='w-full space-y-2 flex-col items-center'>
     <h4 className='text-md text-[var(--SubText)]'>Previlige</h4>
     <p className='text-xl'>Admin</p>
    </div>
    <div className="flex space-x-6 w-full">
     <button type="button" className="px-8 rounded-xl border-2 border-[var(--Yellow)]">
      Edit
     </button>
     <button type="submit" className="px-8 rounded-xl bg-[var(--Yellow)]">
      Delete
     </button>
    </div>
   </sec>
  </article>
 )
}

export default OtherAdmin