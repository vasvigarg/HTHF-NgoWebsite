import React from 'react';
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-lg">
                <Heart className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">HTHF</h3>
                <p className="text-gray-300">Hands That Heal Foundation</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-lg">
              Supporting families through chronic disease with comprehensive care, 
              compassion, and hope. Together, we believe healing happens not just 
              for patients, but for entire families.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-blue-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-700 p-3 rounded-full hover:bg-blue-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a></li>
              <li><a href="#impact" className="text-gray-300 hover:text-white transition-colors">Impact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Resources</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support Groups</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Events</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Help</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-300">1-800-HTHF-HELP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-300">support@hthf.org</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-gray-400 mt-1" />
                <span className="text-gray-300">123 Healing Way<br />Compassion City, CC 12345</span>
              </div>
            </div>
            <div className="mt-6">
              <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-green-600 transition-all">
                Get Support Now
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Hands That Heal Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;