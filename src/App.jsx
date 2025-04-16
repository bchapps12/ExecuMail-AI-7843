import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMailOutline, IoRefreshOutline, IoFilterOutline } from 'react-icons/io5';
import EmailCard from './components/EmailCard';
import ReplyModal from './components/ReplyModal';

// Mock data - replace with actual email API integration
const mockEmails = [
  {
    id: 1,
    from: 'Board Member <board@company.com>',
    subject: 'Q1 Strategy Review',
    summary: 'Request for your input on Q1 performance metrics and strategic initiatives for the upcoming board meeting.',
    keyPoints: [
      'Board meeting scheduled for next week',
      'Q1 metrics show 15% growth',
      'Strategic initiatives review needed'
    ],
    priority: 'urgent',
    time: '1h ago'
  },
  {
    id: 2,
    from: 'VP Sales <vpsales@company.com>',
    subject: 'Enterprise Deal Update',
    summary: 'Major enterprise deal in final stages. Potential $2M annual contract. Requesting approval for special terms.',
    keyPoints: [
      '$2M annual contract value',
      'Special terms approval needed',
      'Final stage negotiations'
    ],
    priority: 'important',
    time: '2h ago'
  },
  {
    id: 3,
    from: 'CFO <cfo@company.com>',
    subject: 'Budget Approval Needed',
    summary: 'Urgent review needed for Q2 budget allocation. Notable changes in R&D and marketing spend.',
    keyPoints: [
      'Q2 budget pending approval',
      'R&D budget increased by 20%',
      'Marketing spend optimization'
    ],
    priority: 'normal',
    time: '3h ago'
  }
];

function App() {
  const [emails] = useState(mockEmails);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredEmails = emails.filter(email => 
    priorityFilter === 'all' ? true : email.priority === priorityFilter
  );

  const handleReply = (email) => {
    setSelectedEmail(email);
  };

  const handleSendReply = (context) => {
    // Here you would integrate with AI API to generate and send reply
    console.log('Sending reply with context:', context);
    setSelectedEmail(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <IoMailOutline className="text-primary-500 text-2xl mr-2" />
              <h1 className="text-xl font-semibold text-gray-800">Executive Mail</h1>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-sm border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All</option>
                <option value="urgent">Urgent</option>
                <option value="important">Important</option>
                <option value="normal">Normal</option>
              </select>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <IoRefreshOutline className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <motion.div layout>
          {filteredEmails.map(email => (
            <EmailCard
              key={email.id}
              email={email}
              onReply={handleReply}
            />
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
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