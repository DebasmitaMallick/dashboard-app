import React from 'react'
import PerformanceScore from './components/PerformanceScore'
import CustomersByDevice from './components/CustomersByDevice'
import CommunityFeedback from './components/CommunityFeedback'

const RightSection = () => {
  return (
    <div id='right-sec' className='w-full gap-4 h-full flex flex-col justify-between'>
      <PerformanceScore />
      <CustomersByDevice />
      <CommunityFeedback />
    </div>
  )
}

export default RightSection