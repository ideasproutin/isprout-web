import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ourLocations from '../../content/ourLocations';
import ogmCenterImage from '../../assets/centers/ogmcenterpage.png';
import SubNavbar from '../../components/SubNavbar/subnavbar';
import Amenities from '../home/components/amenities';


const Centre = () => {
  const { centreId } = useParams();
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    companyName: '',
    requirements: '',
    city: 'Hyderabad',
    office: '',
    managedCabin: false,
    conferenceRoom: false,
    acceptTerms: false
  });

  // Find the center details
  let centerDetails: any = null;
  let cityName = '';
  
  for (const cityData of ourLocations) {
    const center = cityData.centers.find(c => 
      c.centreRedirect === `/centre/${centreId}`
    );
    if (center) {
      centerDetails = center;
      cityName = cityData.city;
      break;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
console.log('Center Details:', centerDetails);
  if (!centerDetails) {
    return <div className="min-h-screen flex items-center justify-center">Center not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Navbar Overlay */}
      <div className="relative h-[520px] w-full">
        <img 
          src={ogmCenterImage} 
          alt={centerDetails.center_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20">
          {/* Navbar on top of image */}
          <div className="absolute top-0 left-0 right-0 z-50">
        <SubNavbar />
          </div>
          {/* Title at bottom */}
          <div className="absolute bottom-9 left-0 right-0 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center px-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Managed Office Space <span style={{ color: '#FFDE00' }}>{centerDetails.center_name}</span>
        </h1>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Illustration */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF8DC] to-[#F5E6D3] rounded-3xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Interested in this location?
            </h2>
            <h3 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Book a Tour!
            </h3>
            <p className="mt-4 text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Complete the form to book a tour or connect with one of our team members to find out more.
            </p>
          </div>
          <div className="relative w-64 h-64">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 rounded-full" style={{ backgroundColor: '#204758' }}></div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-6xl">
              👁️
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Full Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                />
                <span className="absolute right-3 top-3 text-gray-400">👤</span>
              </div>
            </div>

            {/* Work Email and Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Work Email:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  />
                  <span className="absolute right-3 top-3 text-gray-400">✉️</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Phone Number:
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                    style={{ fontFamily: 'Outfit, sans-serif' }}
                  />
                  <span className="absolute right-3 top-3 text-gray-400">📞</span>
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Company Name:
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                />
                <span className="absolute right-3 top-3 text-gray-400">🏢</span>
              </div>
            </div>

            {/* Select Your Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Select Your Requirements
              </label>
              <select
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                <option value="">Select...</option>
                <option value="managed-office">Managed Office</option>
                <option value="virtual-office">Virtual Office</option>
                <option value="meeting-room">Meeting Room</option>
              </select>
            </div>

            {/* City and Office */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  City:
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Pune">Pune</option>
                  <option value="Gurugram">Gurugram</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Office:
                </label>
                <select
                  name="office"
                  value={formData.office}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                >
                  <option value="">One Golden Mile</option>
                  <option value="orbit">Orbit</option>
                  <option value="twitza">My Home Twitza</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="managedCabin"
                  checked={formData.managedCabin}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#204758] border-gray-300 rounded focus:ring-[#204758]"
                />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Managed cabin</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="conferenceRoom"
                  checked={formData.conferenceRoom}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-[#204758] border-gray-300 rounded focus:ring-[#204758]"
                />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Conference Room</span>
              </label>
            </div>

            {/* Required Fields */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Required fields:
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📍</span>
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-[#204758] focus:outline-none text-sm"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                />
                <button type="button" className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                  +
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                className="w-5 h-5 mt-1 text-[#204758] border-gray-300 rounded focus:ring-[#204758]"
              />
              <span className="text-sm text-gray-700" style={{ fontFamily: 'Outfit, sans-serif' }}>
                I accept all of iSprout's terms & conditions
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full font-bold text-white transition-all hover:scale-105"
              style={{ backgroundColor: '#204758', fontFamily: 'Outfit, sans-serif' }}
            >
              Submit
            </button>
          </form>

          {/* Office Space Contact */}
          <div className="mt-8 p-6 rounded-xl" style={{ backgroundColor: '#E8F4F8' }}>
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              Office Space:
            </h3>
            <div className="space-y-2 text-sm" style={{ fontFamily: 'Outfit, sans-serif', color: '#204758' }}>
              <div className="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 47 333 97161</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✉️</span>
                <span>iyhdeserge@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📍</span>
                <span>2502 Roosevelt Haven, Manhattan EA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities Section */}
      <Amenities />
    </div>
  );
};

export default Centre;