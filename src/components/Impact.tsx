import React from 'react';
import { TrendingUp, Users, Heart, Star, Quote } from 'lucide-react';
import DonationModal from './DonationModal';

const Impact: React.FC = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = React.useState(false);

  const stats = [
    { number: "5,000+", label: "Families Supported", icon: Users, color: "text-blue-600" },
    { number: "15+", label: "Years of Service", icon: TrendingUp, color: "text-green-600" },
    { number: "25,000+", label: "Lives Touched", icon: Heart, color: "text-red-600" },
    { number: "98%", label: "Satisfaction Rate", icon: Star, color: "text-yellow-600" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      condition: "Cancer Survivor",
      quote: "HTHF didn't just help me through my cancer journey—they supported my entire family. When I felt lost, they gave us hope and practical help.",
      image: "SJ"
    },
    {
      name: "Michael Chen",
      condition: "Diabetes Management",
      quote: "Learning to manage diabetes was overwhelming until HTHF connected us with resources and a support network that truly understood our challenges.",
      image: "MC"
    },
    {
      name: "Rosa Martinez",
      condition: "Family Caregiver",
      quote: "As a caregiver for my husband's kidney disease, HTHF provided emotional support that helped me stay strong for our family.",
      image: "RM"
    }
  ];

  return (
    <section id="impact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every number represents a family we've helped, a life we've touched, 
            and hope we've restored in the face of chronic illness.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-100 transition-colors">
                  <IconComponent className={`${stat.color}`} size={36} />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">Stories of Hope</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 relative">
                <Quote className="text-blue-300 mb-4" size={32} />
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.condition}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-6">Be Part of the Solution</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your support helps us continue making a difference in the lives of families 
            facing chronic diseases. Together, we can provide hope, healing, and support 
            when it's needed most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Donate Today
            </button>
            <a 
              href="https://forms.gle/euWhzmLQDjZcS9Qb6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-block text-center"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </div>
      
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </section>
  );
};

export default Impact;