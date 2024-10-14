import React from 'react'
import Login from './login/page'
import { auth } from '@/auth'

const HomePage = async() => {
  const session = await auth()

  if (session) {
    return <div>
      <Login />
    </div>
  }
  return (
    <div>
      Welcome
    </div>
  )
}

export default HomePage
