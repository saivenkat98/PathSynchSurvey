export interface SpeakerInfo {
  name: string;
  linkedin: string;
  date: string;
  time: string;
}

export interface SurveyResponses {
  name?: string;
  email?: string;
  phone?: string;
  clarity: number;
  relevance: 'Yes' | 'No' | 'Somewhat';
  takeaway: string;
  engagement: number;
  recommend: 'Yes' | 'No';
  additional: string;
}

export interface SurveySubmission {
  speaker: string;
  linkedin: string;
  date: string;
  time: string;
  responses: SurveyResponses;
  timestamp: string;
}

export type FormState = 'form' | 'submitting' | 'success';