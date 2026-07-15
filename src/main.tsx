// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router'
import { UserProvider } from './context/userContext';
import './index.css'
import Home from './home'
import Profile from './profile'
import TaskPage from './taskPage'
import Invoice from './invoice'
import SingleInvoice from './invoicePage'
import Jobs from './jobs'
import SingleJobPage from './singleJob'

let router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/tasks",
    element: <TaskPage />,
  },
  {
    path: "/invoice",
    element: <Invoice />,
  },
  {
    path: "/invoice/:id",
    element: <SingleInvoice />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/job/:id",
    element: <SingleJobPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>,
)
