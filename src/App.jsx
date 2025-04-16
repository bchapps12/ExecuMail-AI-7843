import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSettingsOutline } from 'react-icons/io5';
import EmailCard from './components/EmailCard';
import ReplyModal from './components/ReplyModal';
import SettingsModal from './components/SettingsModal';
import DraftsScreen from './components/DraftsScreen';

// Mock data for testing
const mockEmails = [
  {
    id: 1,
    from: 'board@company.com',
    subject: 'Q1 Strategy Review',
    summary: 'Board meeting next week to review Q1 metrics',
    priority: 'urgent',
    time: '1h ago',
    thread: {
      duration: '2 days',
      participants: 4,
      emails: [1, 2, 3],
      summary: 'Discussion about Q1 performance metrics',
      keyPoints: ['Revenue up 20%', 'New market expansion', 'Team growth plans']
    }
  },
  // Add more mock emails as needed
];

function App() {
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
    summaryPrompt: 'Summarize this email concisely for a busy executive...',
    replyPrompt: 'Generate a professional response considering the context...'
  });

  const [emails] = useState(mockEmails);
  const [drafts, setDrafts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [view, setView] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emailsPerPage = 10;
  const paginatedEmails = emails.slice(
    (currentPage - 1) * emailsPerPage,
    currentPage * emailsPerPage
  );

  const handleReply = (email) => {
    setSelectedEmail(email);
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    // Save to localStorage or your backend
  };

  const handleEditDraft = (draft) => {
    // Implement draft editing logic
    console.log('Editing draft:', draft);
  };

  const handleDeleteDraft = (draftId) => {
    setDrafts(drafts.filter(d => d.id !== draftId));
  };

  const handleSendReply = (context) => {
    // Implement reply sending logic
    console.log('Sending reply with context:', context);
    setSelectedEmail(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Executive Mail</h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setView(view === 'inbox' ? 'drafts' : 'inbox')}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
              >
                {view === 'inbox' ? 'View Drafts' : 'View Inbox'}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <IoSettingsOutline className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {view === 'inbox' ? (
          <>
            <motion.div layout>
              {paginatedEmails.map(email => (
                <EmailCard
                  key={email.id}
                  email={email}
                  onReply={handleReply}
                  onSaveAsDraft={(email, context) => {
                    setDrafts([...drafts, {
                      id: Date.now(),
                      originalEmail: email,
                      content: context,
                      lastEdited: new Date().toLocaleString()
                    }]);
                  }}
                />
              ))}
            </motion.div>
            
            <div className="flex justify-center mt-6 space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {Math.ceil(emails.length / emailsPerPage)}
              </span>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage >= Math.ceil(emails.length / emailsPerPage)}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
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