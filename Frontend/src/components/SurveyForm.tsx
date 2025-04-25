import React, { useState } from 'react';
import { SurveyResponses, SpeakerInfo, FormState } from '../types/survey';
import RatingInput from './RatingInput';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import ConfirmationScreen from './ConfirmationScreen';
import { Send } from 'lucide-react';

interface SurveyFormProps {
  speakerInfo: SpeakerInfo;
}

const SurveyForm: React.FC<SurveyFormProps> = ({ speakerInfo }) => {
  const [formState, setFormState] = useState<FormState>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [responses, setResponses] = useState<SurveyResponses>({
    name: '',
    email: '',
    phone: '',
    clarity: 0,
    relevance: '' as 'Yes' | 'No' | 'Somewhat',
    takeaway: '',
    engagement: 0,
    recommend: '' as 'Yes' | 'No',
    additional: ''
  });

  const updateResponse = <K extends keyof SurveyResponses>(
    field: K, 
    value: SurveyResponses[K]
  ) => {
    setResponses(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (responses.clarity === 0) {
      newErrors.clarity = 'Please rate the presentation clarity';
    }
    
    if (!responses.relevance) {
      newErrors.relevance = 'Please select an option';
    }
    
    if (!responses.takeaway.trim()) {
      newErrors.takeaway = 'Please share your key takeaway';
    }
    
    if (responses.engagement === 0) {
      newErrors.engagement = 'Please rate the speaker engagement';
    }
    
    if (!responses.recommend) {
      newErrors.recommend = 'Please select an option';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setFormState('submitting');
    
    try {
      const response = await fetch(`http://localhost:3000/track-event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          speakerInfo,
          responses,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit survey');
      }

      setFormState('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
      setFormState('form');
    }
  };

  if (formState === 'success') {
    return <ConfirmationScreen speakerName={speakerInfo.name} />;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 transition-all">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Session Feedback</h3>
      
      {errors.form && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
          {errors.form}
        </div>
      )}

      <div className="mb-8 space-y-4">
        <TextInput
          name="name"
          value={responses.name || ''}
          onChange={(value) => updateResponse('name', value)}
          label="Name"
          placeholder="Your name (optional)"
        />
        
        <TextInput
          name="email"
          value={responses.email || ''}
          onChange={(value) => updateResponse('email', value)}
          label="Email"
          placeholder="Your email (optional)"
          type="email"
        />
        
        <TextInput
          name="phone"
          value={responses.phone || ''}
          onChange={(value) => updateResponse('phone', value)}
          label="Phone Number"
          placeholder="Your phone number (optional)"
          type="tel"
        />
      </div>
      
      <RatingInput
        name="rating_clarity"
        value={responses.clarity}
        onChange={(value) => updateResponse('clarity', value)}
        label="1. How clear was the presentation? (1-5)"
        error={errors.clarity}
      />
      
      <RadioInput
        name="relevance"
        value={responses.relevance}
        onChange={(value) => updateResponse('relevance', value as 'Yes' | 'No' | 'Somewhat')}
        label="2. Was the content relevant to you?"
        options={['Yes', 'No', 'Somewhat']}
        error={errors.relevance}
      />
      
      <TextInput
        name="takeaway"
        value={responses.takeaway}
        onChange={(value) => updateResponse('takeaway', value)}
        label="3. What was your key takeaway from this session?"
        placeholder="Enter your key takeaway..."
        required
        error={errors.takeaway}
      />
      
      <RatingInput
        name="rating_engagement"
        value={responses.engagement}
        onChange={(value) => updateResponse('engagement', value)}
        label="4. How engaging was the speaker? (1-5)"
        error={errors.engagement}
      />
      
      <RadioInput
        name="recommend"
        value={responses.recommend}
        onChange={(value) => updateResponse('recommend', value as 'Yes' | 'No')}
        label="5. Would you recommend this speaker to others?"
        options={['Yes', 'No']}
        error={errors.recommend}
      />
      
      <TextInput
        name="additional"
        value={responses.additional}
        onChange={(value) => updateResponse('additional', value)}
        label="6. Additional comments or feedback"
        placeholder="Optional additional feedback..."
        multiline
      />
      
      <div className="mt-8">
        <button
          id="submit-feedback-btn"
          type="submit"
          disabled={formState === 'submitting'}
          className="w-full bg-[#2B4C32] hover:bg-[#1a2e1e] text-white py-3 px-6 rounded-md font-medium focus:outline-none focus:ring-4 focus:ring-[#2B4C32]/30 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {formState === 'submitting' ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              Submit Feedback
              <Send size={16} className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default SurveyForm;