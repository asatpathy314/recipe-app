import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Login from './routes/Login.jsx'
import Discover from './routes/Discover'
import Register from './routes/Register.jsx'
import Create from './routes/Create'
import AuthProvider from './components/AuthProvider.jsx'

// Routes
// If you want to use the Navbar add your component to children, otherwise add it to the end of the list as a new object.
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/discover',
        element: <Discover />
      },
      {
        path: '/discover',
        element: <Discover />
      },
      {
        path: '/create',
        element: <Create />
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

// Render the app
const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router}/>
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
)