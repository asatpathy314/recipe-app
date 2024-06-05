import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'


const App = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
