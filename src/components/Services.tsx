import React from 'react';
import { Heart, Stethoscope, Users, Phone, DollarSign, BookOpen } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Heart,
      title: "Cancer Support Programs",
      description: "Comprehensive support for cancer patients and families, including treatment navigation, emotional support, and recovery assistance.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Stethoscope,
      title: "Diabetes Management",
      description: "Education, monitoring support, and lifestyle guidance for diabetes patients and their families to maintain healthy lives.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Respiratory Care",
      description: "Specialized programs for respiratory conditions, providing breathing support, equipment assistance, and family education.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Phone,
      title: "Kidney Health Programs",
      description: "Support for kidney disease patients including dialysis assistance, transplant guidance, and family counseling.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: DollarSign,
      title: "Financial Assistance",
      description: "Help with medical bills, insurance navigation, and financial planning to reduce the economic burden on families.",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: BookOpen,
      title: "Family Education",
      description: "Educational workshops and resources to help families understand conditions and become active participants in care.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive support services designed to address every aspect of chronic disease 
            management for patients and their families.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className={`bg-gradient-to-r ${service.color} p-4 rounded-xl w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>
                <a 
                  href="#contact" 
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center space-x-2 group"
                >
                  <span>Learn More</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">24/7 Support Helpline</h3>
              <p className="text-lg text-gray-600 mb-6">
                Our dedicated support team is available around the clock to provide immediate assistance, 
                guidance, and emotional support when you need it most.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Crisis intervention and emotional support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Medical information and resources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Connection to local services and support groups</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white text-3xl font-bold py-4 px-8 rounded-xl mb-4">
                9212850560
              </div>
              <p className="text-gray-600 mb-4">Available 24 hours a day, 7 days a week</p>
              <a 
                href="tel:9212850560" 
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;