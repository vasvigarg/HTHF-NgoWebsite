import React from 'react';
import { ArrowRight, Users, Heart, Shield } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Healing
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500"> Together</span>
                <br />
                Supporting Families
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Hands That Heal Foundation believes that chronic disease affects not just a patient, 
                but the whole family. We're here to support every step of your journey back to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Get Support</span>
                <ArrowRight size={20} />
              </button>
              <button className="border-2 border-green-500 text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-500 hover:text-white transition-colors">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-800">5000+</div>
                <div className="text-sm text-gray-600">Families Supported</div>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Heart className="text-green-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-800">15+</div>
                <div className="text-sm text-gray-600">Years of Care</div>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Shield className="text-purple-600" size={24} />
                </div>
                <div className="text-2xl font-bold text-gray-800">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-green-400 rounded-3xl p-8 transform rotate-3 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 transform -rotate-3">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                      <Heart className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Complete Family Support</h3>
                      <p className="text-gray-600 text-sm">We understand that healing involves everyone</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Cancer Support Programs</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">Diabetes Management</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">Respiratory Care</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700">Kidney Health Programs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;