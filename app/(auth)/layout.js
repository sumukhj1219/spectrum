import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex items-center justify-center mx-auto min-h-screen'>
      {children}
    </div>
  )
}

export default AuthLayout
