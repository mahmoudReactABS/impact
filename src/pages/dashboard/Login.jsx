import React from 'react'
import photo from '../../assets/login.png'
function Login() {
  return (
    <main className='grid grid-cols-1 md:grid-cols-2 md:px-40 px-4'>
      <section>
       <img src={photo} className='w-full h-full' />
      </section>

      <section className='flex flex-col justify-center items-center py-10 space-y-20 border-2 rounded-2xl border-[var(--SubTextBorder)]'>
       <h1 className='font-bold text-5xl'>Log in</h1>

       <form action="" className='space-y-10 w-full px-10'>
        <div className='flex flex-col space-y-6'>
         <label className='text-xl'>Email</label>
         <input placeholder='1234@gmail.com' type="email" className='py-2 px-4 rounded-lg bg-[var(--Input)]' />
        </div>
        
        <div className='flex flex-col space-y-6'>
         <label className='text-xl'>Password</label>
         <input placeholder='**********' type="password" className='py-2 px-4 rounded-lg bg-[var(--Input)]' />
        </div>

        <button type="submit" className="p-4 px-8 text-2xl w-full rounded-2xl bg-[var(--Yellow)]">Login</button>
       </form>
      </section>

      <p className='pt-10'>Designed and Developed by ABSAI.dev</p>
    </main>
  )
}

export default Login
