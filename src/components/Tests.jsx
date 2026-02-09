import React from 'react'
import Cards from './Cards'

const Tests = () => {
  return (
    <div className=' text-gray-500 mx-auto flex items-center p-10 gap-5 '>
      <Cards testType="Sample Test" content="This is a sample test designed to help you get familiar with the interface. Password: password"/>
      <Cards testType="ACUMEN'26" content="This is the official test for ACUMEN'26. The password to unlock it will be shared shortly."/>
    </div>
  )
}

export default Tests
