import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/home/home'
import AboutUs from './pages/aboutus/aboutus'
import ManagedOffice from './pages/managedoffice/managedoffice'
import AwardsAndAchievements from './pages/awards/awardsandachievements'
import Locations from './pages/locations/locations'
import VirtualOfficeIntro from './pages/virtualoffice/intro'
import MeetingRoomsIntro from './pages/meetingrooms/intro'
import BlogsIntro from './pages/blogs/intro'
import SpotlightIntro from './pages/spotlight/intro'
import CareersIntro from './pages/careers/intro'
import Testimonials from './pages/testimonials/testimonials'

import Navbar from './components/navbar/navbar'
import SubNavbar from './components/SubNavbar/subnavbar'

function AppContent() {
  return (
    <>
      <Navbar />
      <SubNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/managed-office" element={<ManagedOffice />} />
        <Route path="/awards" element={<AwardsAndAchievements />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/virtual-office" element={<VirtualOfficeIntro />} />
        <Route path="/meeting-rooms" element={<MeetingRoomsIntro />} />
        <Route path="/blogs" element={<BlogsIntro />} />
        <Route path="/spotlight" element={<SpotlightIntro />} />
        <Route path="/careers" element={<CareersIntro />} />
        <Route path="/testimonials" element={<Testimonials />} />
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
