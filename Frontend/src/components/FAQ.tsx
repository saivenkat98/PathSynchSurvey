import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is PathSynch?",
      answer: "PathSynch is a loyalty and engagement platform that helps small businesses thrive. With tools like PathConnect for capturing real-world reviews and CommerceSynch for managing digital memberships and VIP rewards, we turn everyday foot traffic into lasting customer relationships."
    },
    {
      question: "Who is PathSynch for?",
      answer: "SMBs, conferences, nonprofits, and community orgs that want to drive foot traffic, gain customer insight, build loyalty, and create memorable experiences."
    },
    {
      question: "How can I get involved?",
      answer: "Simply get in touch, partner with us, or reach out to explore collaboration. Just email us at hello@pathsynch.com or book a 15-min chat."
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Need more info?
      </h2>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setOpenItem(openItem === index ? null : index)}
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              {openItem === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            
            {openItem === index && (
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;