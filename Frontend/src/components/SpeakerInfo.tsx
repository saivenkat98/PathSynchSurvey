import React from 'react';
import { Calendar, Clock, Linkedin } from 'lucide-react';
import { SpeakerInfo as SpeakerInfoType } from '../types/survey';

interface SpeakerInfoProps {
  speakerInfo: SpeakerInfoType;
}

const SpeakerInfo: React.FC<SpeakerInfoProps> = ({ speakerInfo }) => {
  const { name, linkedin, date, time } = speakerInfo;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-600 transform transition-all hover:shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {name.split(' ').map(part => part[0]).join('')}
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <a 
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <Linkedin size={16} className="mr-1" />
            <span>LinkedIn Profile</span>
          </a>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center text-gray-700">
          <Calendar size={20} className="mr-2 text-indigo-600" />
          <span>{new Date(date).toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Clock size={20} className="mr-2 text-indigo-600" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default SpeakerInfo;