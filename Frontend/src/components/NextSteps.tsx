import React from 'react';
import { Star, Users, Globe, Calendar, Linkedin, Instagram, Globe2 } from 'lucide-react';

const NextSteps: React.FC = () => {
  return (
    <section className="bg-white rounded-lg shadow-md p-8 mb-12">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        🌱 This is just the beginning.
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Stay close. Big things are on the way.<br />
        Here's how you can keep the momentum going:
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Star className="h-6 w-6 text-[#2B4C32]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Rate us</h3>
            <p className="text-gray-600">We'd love to know what you think. Your feedback helps us grow.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Users className="h-6 w-6 text-[#2B4C32]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Follow us</h3>
            <p className="text-gray-600">Stay up to date on launches, features, and community events.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Globe className="h-6 w-6 text-[#2B4C32]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Visit our website</h3>
            <p className="text-gray-600">Dive deeper into how PathSynch supports small businesses.</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Calendar className="h-6 w-6 text-[#2B4C32]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Book a chat</h3>
            <p className="text-gray-600">Whether you're a potential partner or just want to connect — we'd love to talk.</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
        <a
          href="https://www.linkedin.com/company/pathsynch"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0A66C2] hover:bg-[#004182] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Linkedin size={20} />
          LinkedIn
        </a>
        <a
          href="https://www.instagram.com/pathsynch"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#E4405F] hover:bg-[#D62E4C] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Instagram size={20} />
          Instagram
        </a>
        <a
          href="https://pathsynch.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2B4C32] hover:bg-[#1a2e1e] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Globe2 size={20} />
          Website
        </a>
      </div>
    </section>
  );
};

export default NextSteps;