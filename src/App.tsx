import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import SubNavbar from './components/SubNavbar/subnavbar'

function App() {
  return (
    <div className="bg-transparent">
      <Navbar />
      <SubNavbar />
      <Outlet />
    </div>
  )
}

export default App
