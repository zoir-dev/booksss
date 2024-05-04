import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('data') || '').key && window.location.pathname === '/') {
      return navigate('/sign')
    } else if (JSON.parse(localStorage.getItem('data') || '')?.key) {
      return navigate('/')
    }
  }, [navigate])

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute