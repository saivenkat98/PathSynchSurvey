import React from 'react';
import SpeakerInfo from './components/SpeakerInfo';
import SurveyForm from './components/SurveyForm';
import NextSteps from './components/NextSteps';
import FAQ from './components/FAQ';
import { SpeakerInfo as SpeakerInfoType } from './types/survey';

function App() {
  const speakerInfo: SpeakerInfoType = {
    name: "Charles Berry",
    linkedin: "https://www.linkedin.com/in/charles-berry-a66a3b5/",
    date: "2025-04-25",
    time: "6:00 PM"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="./PathSynch.png"
              alt="PathSynch Logo" 
              className="h-24 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            It Takes a Village Pre-Accelerator #15
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Thank you for attending the pitch competition. Please provide your valuable feedback
            about the presentation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://pathsynch.com/request-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#2B4C32] hover:bg-[#1a2e1e] text-white px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
            >
              Book a Demo
            </a>
            <a
              href="https://pathsynch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#2B4C32] border-2 border-[#2B4C32] px-8 py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
            >
              Visit Website
            </a>
          </div>
        </header>

        <main className="space-y-8">
          <SpeakerInfo speakerInfo={speakerInfo} />
          <NextSteps />
          <SurveyForm speakerInfo={speakerInfo} />
          <FAQ />
        </main>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p className="mb-2">© 2025 PathSynch. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://pathsynch.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2B4C32] hover:text-[#1a2e1e] transition-colors"
            >
              Visit PathSynch Website
            </a>
            <span>|</span>
            <a
              href="https://pathsynch.com/request-demo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2B4C32] hover:text-[#1a2e1e] transition-colors"
            >
              Request a Demo
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;