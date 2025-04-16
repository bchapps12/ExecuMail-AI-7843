import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSettingsOutline } from 'react-icons/io5';
import EmailCard from './components/EmailCard';
import DraftsScreen from './components/DraftsScreen';
import SettingsModal from './components/SettingsModal';
import ReplyModal from './components/ReplyModal';
import './App.css';

// Mock data for testing
const mockEmails = [
  {
    id: '1',
    threadId: 't1',
    from: 'board@company.com',
    subject: 'Q1 Strategy Review',
    summary: 'Board meeting next week to review Q1 metrics',
    priority: 'urgent',
    time: '1h ago',
    thread: {
      duration: '2 days',
      participants: 4,
      emails: ['1', '2', '3'],
      summary: 'Discussion about Q1 performance metrics',
      keyPoints: ['Revenue up 20%', 'New market expansion', 'Team growth plans']
    }
  },
  // Add more mock emails as needed
];

function App() {
  const [emails] = useState(mockEmails);
  const [drafts, setDrafts] = useState([]);
  const [view, setView] = useState('inbox');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [settings, setSettings] = useState({
    labels: [
      { id: 'inbox', name: 'Inbox', selected: true },
      { id: 'important', name: 'Important', selected: false },
      { id: 'work', name: 'Work', selected: false }
    ],
    openaiKey: '',
    elevenLabsKey: '',
    voice: 'adam',
    speed: 1,
    summaryPrompt: 'Summarize this email concisely...',
    replyPrompt: 'Generate a professional response...'
  });

  const handleReply = (email) => {
    setSelectedEmail(email);
  };

  const handleSendReply = (context) => {
    console.log('Sending reply:', context);
    setSelectedEmail(null);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const handleSaveAsDraft = (email, content) => {
    const newDraft = {
      id: Date.now().toString(),
      originalEmail: email,
      content,
      lastEdited: new Date().toLocaleString()
    };
    setDrafts([newDraft, ...drafts]);
  };

  const handleEditDraft = (draft) => {
    // Implement draft editing
    console.log('Editing draft:', draft);
  };

  const handleDeleteDraft = (draftId) => {
    setDrafts(drafts.filter(d => d.id !== draftId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Executive Mail</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                <IoSettingsOutline className="text-gray-600 mr-1.5" />
                Settings
              </button>
              <button
                onClick={() => setView(view === 'inbox' ? 'drafts' : 'inbox')}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                {view === 'inbox' ? 'View Drafts' : 'View Inbox'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {view === 'inbox' ? (
          <motion.div layout className="space-y-2">
            {emails.map(email => (
              <EmailCard
                key={email.id}
                email={email}
                onReply={handleReply}
                onSaveAsDraft={handleSaveAsDraft}
              />
            ))}
          </motion.div>
        ) : (
          <DraftsScreen
            drafts={drafts}
            onEdit={handleEditDraft}
            onDelete={handleDeleteDraft}
          />
        )}
      </main>

      <AnimatePresence>
        {showSettings && (
          <SettingsModal
            settings={settings}
            onClose={() => setShowSettings(false)}
            onSave={handleSaveSettings}
          />
        )}
        {selectedEmail && (
          <ReplyModal
            email={selectedEmail}
            onClose={() => setSelectedEmail(null)}
            onSend={handleSendReply}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;