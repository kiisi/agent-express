import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration, useNavigate } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import SplashScreen from "./components/SplashScreen";
import { useState, useEffect } from 'react'

const Root = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      console.log(user)
      if (!user) {
        navigate('/login')
      }else{
        navigate('/')
      }
      setLoading(true)
    }, 2000)

    return () => clearTimeout(splashTimer)
  }, [])


  return (
    <div>
      <ScrollRestoration />
      {
        loading ? <Outlet /> : <SplashScreen />
      }
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
    ]
  },
]);

export default function App() {
  return <RouterProvider router={router} />
}