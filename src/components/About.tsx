import React from 'react';
import { Heart, Users, Target, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About HTHF</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hands That Heal Foundation is a beacon of hope for families facing chronic diseases. 
            We believe in comprehensive care that extends beyond the patient to embrace the entire family unit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">Our Mission</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We understand that when someone in a family faces a chronic disease like cancer, diabetes, 
              respiratory problems, or kidney issues, it's not just one person's battle—it's a journey 
              that affects everyone who loves them.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              HTHF is committed to providing comprehensive support that addresses not only the medical 
              needs of patients but also the emotional, financial, and psychological challenges faced 
              by their families.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-full">
                <Heart className="text-white" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Compassionate Care</h4>
                <p className="text-gray-600">Every family deserves support and understanding</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={28} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Family-Centered</h4>
                <p className="text-gray-600 text-sm">Supporting the entire family unit through every challenge</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target size={28} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Comprehensive</h4>
                <p className="text-gray-600 text-sm">Addressing medical, emotional, and financial needs</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={28} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Compassionate</h4>
                <p className="text-gray-600 text-sm">Every interaction guided by empathy and understanding</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={28} />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Excellence</h4>
                <p className="text-gray-600 text-sm">Committed to the highest standards of care and support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            A world where no family faces chronic disease alone. Where every patient and their loved ones 
            have access to the support, resources, and care they need to not just survive, but thrive. 
            We envision communities where healing happens together, and hope is always within reach.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;