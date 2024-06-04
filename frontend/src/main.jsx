import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './routes/Login.jsx'
import Discover from './routes/Discover'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './components/AuthProvider.jsx'

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <p>hi hello</p>
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/discover',
    element: <Discover />
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