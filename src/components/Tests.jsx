import React from 'react'
import Cards from './Cards'

const Tests = () => {
  return (
    <div className=' text-gray-500 mx-auto flex items-center p-10 gap-5 '>
      <Cards testType="Sample Test" content="This is a sample test to try the Password to unlock the test is:password"/>
      <Cards testType="Test" content="This is a actual test. The Password to unlock will be shared in a while"/>
    </div>
  )
}

export default Tests
