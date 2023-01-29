import React from 'react'

import spinner from '../assets/images/loading.gif'
export default function LoadingSpinner({ loading }) {
  if (!loading) return null
  return (
    <div className='flex item-center justify-center'>
      <img src={spinner} alt='' />
    </div>
  )
}
