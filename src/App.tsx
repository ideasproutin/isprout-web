import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/home/home'
import AboutUs from './pages/aboutus/aboutus'
import ManagedOffice from './pages/managedoffice/managedoffice'
import Navbar from './components/navbar/navbar'
import SubNavbar from './components/SubNavbar/subnavbar'

function AppContent() {
  const location = useLocation()
  const isAboutUsPage = location.pathname === '/about-us'

  return (
    <>
      {!isAboutUsPage && <Navbar />}
      <SubNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/managed-office" element={<ManagedOffice />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
