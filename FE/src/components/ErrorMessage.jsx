import React from 'react'

function ErrorMessage({ className, message }) {
  return (
    <div className={`${className} text-xl text-center bg-red-500 text-white rounded-md p-2 my-4 mx-auto`}>
      {message}
    </div>
  )
}

export default ErrorMessage
