// Type definitions for the application

interface User {
  id: string;
  email: string;
  name: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  selectedLabels: string[];
  voiceSettings: VoiceSettings;
  aiSettings: AISettings;
}

interface VoiceSettings {
  voice: string;
  speed: number;
  elevenlabsKey?: string;
}

interface AISettings {
  openaiKey?: string;
  summaryPrompt: string;
  replyPrompt: string;
}

interface EmailThread {
  id: string;
  subject: string;
  participants: number;
  duration: string;
  emails: Email[];
  summary?: string;
  keyPoints?: string[];
}

interface Email {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  body: string;
  summary?: string;
  priority: 'urgent' | 'important' | 'normal';
  time: string;
  labels: string[];
}

interface Draft {
  id: string;
  originalEmail: Email;
  content: string;
  lastEdited: string;
}

// Add these type definitions to your project for better type safety