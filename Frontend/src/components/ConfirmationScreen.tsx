import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationScreenProps {
  speakerName: string;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ speakerName }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center transition-all animate-fadeIn">
      <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
        <CheckCircle size={48} />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Thank You!</h2>
      
      <p className="text-gray-600 mb-6">
        Your feedback for {speakerName}'s presentation has been successfully submitted. 
        We appreciate your input and time!
      </p>
      
      <div className="mt-2 text-sm text-gray-500">
        <p>Your responses help our speakers improve their presentations.</p>
      </div>
      
      <div className="mt-8">
        <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 p-[1px] rounded-md">
          <button
            onClick={() => window.location.reload()}
            className="bg-white hover:bg-gray-50 text-indigo-700 py-2 px-6 rounded-md font-medium transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;