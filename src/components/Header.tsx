import React, { useState } from 'react';
import { Menu, X, Heart, Phone, Mail } from 'lucide-react';
import DonationModal from './DonationModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <a href="tel:9212850560" className="hover:text-blue-200 transition-colors">9212850560</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <span>info@hthf.org</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Making a difference, one family at a time</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
              <Heart className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">HTHF</h1>
              <p className="text-sm text-gray-600">Hands That Heal Foundation</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Home</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Services</a>
            <a href="#impact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Impact</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
          </div>

          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-green-500 text-white px-6 py-2 rounded-full font-medium hover:bg-green-600 transition-colors"
            >
              Donate Now
            </button>
            <a 
              href="https://forms.gle/euWhzmLQDjZcS9Qb6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-colors inline-block text-center"
            >
              Volunteer
            </a>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 font-medium">Home</a>
              <a href="#about" className="text-gray-700 font-medium">About</a>
              <a href="#services" className="text-gray-700 font-medium">Services</a>
              <a href="#impact" className="text-gray-700 font-medium">Impact</a>
              <a href="#contact" className="text-gray-700 font-medium">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <button 
                  onClick={() => setIsDonationModalOpen(true)}
                  className="bg-green-500 text-white px-6 py-2 rounded-full font-medium"
                >
                  Donate Now
                </button>
                <a 
                  href="https://forms.gle/euWhzmLQDjZcS9Qb6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full font-medium inline-block text-center"
                >
                  Volunteer
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </header>
  );
};

export default Header;