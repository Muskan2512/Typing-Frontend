import React from 'react'
import Cards from './Cards'

const Tests = () => {
  return (
    <div className=' text-gray-500 mx-auto flex items-center p-10 gap-5 '>
      <Cards testType="Sample Test" content="This is a sample test designed to help you get familiar with the interface. Password: sample"/>
      <Cards testType="INFOTREK'25" content="This is the official test for INFOTREK'25. The password to unlock it will be shared shortly."/>
    </div>
  )
}

export default Tests
