import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './homepage'
import Body from './body'
import Futter from './futter'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Signup from './siggnup'
import Login from './login'
import Chat from './chat/chat'
function App() {
  const router=createBrowserRouter([
    {path:"/",element:<> <Homepage/><Body/> <Futter/></>},
    {path:"/signup",element:<><Signup/></>},
    {path:"/login",element:<><Login/></>},
    {path:"/chat",element:<><Chat /></>},
  ])
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={router}/>
    
    

    </>
  )
}

export default App
