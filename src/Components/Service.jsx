import React from 'react'

function Service(props) {
  return (
    <article data-aos="fade-left" data-aos-delay={props.delay} className='p-3 px-4 flex items-center gap-4 lg:gap-12 border-2 rounded-4xl border-neutral-200 hover:border-[var(--Main)] hover:bg-blue-100'>
      <props.icon className='text-[var(--Main)] text-9xl md:text-6xl' />
      <div className='space-y-2'>
       <h1 className='text-md md:text-xl font-bold'>{props.title}</h1>
       <p className='text-sm md:text-lg'>{props.details}</p>
      </div>
    </article>
  )
}

export default Service
