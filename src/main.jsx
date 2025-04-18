import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router";
import Root from './Root/Root.jsx';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Registration from './Components/Registration/Registration.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path:'login',
        element: <Login></Login>,
      },
      {
        path: 'registration',
        element: <Registration></Registration>,
      }
    ]

  }
])

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,

)
