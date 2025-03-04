import React from 'react'
import { FaCheck } from 'react-icons/fa'

function Bnfts(props) {
 return (
  <article className='border-2 border-[var(--SubTextBorder)] p-4 rounded-3xl flex space-x-4 lg:space-x-8 items-center'>
   <span className='p-2 inline-block text-white bg-[var(--Main)]'>
    <FaCheck />
   </span>
   <p className='text-md lg:text-center lg:text-lg'>{props.text}</p>
  </article>
 )
}

export default Bnfts
