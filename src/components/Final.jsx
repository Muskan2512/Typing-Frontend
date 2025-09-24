import React, { useEffect } from 'react'

const Final = ({ final }) => {


  return (
    <div className='flex flex-col items-center justify-center'>
      {final ? (
        <p className='instruction text-blue-500 font-bold text-[2rem]'>
          Thank you for participating...
        </p>   
      ) : (
        <p className='instruction text-blue-500 p-3 text-center'>
          Type the above paragraph to test your speed.
        </p>
      )}
    </div>
  )
}

export default Final;
