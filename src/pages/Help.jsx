import React from 'react';
import { motion } from 'framer-motion';
import { IoHelpCircleOutline } from 'react-icons/io5';

const HelpPage = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <section>
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <IoHelpCircleOutline className="mr-2" />
            Executive Mail Help
          </h1>
          <p className="text-gray-600">
            Executive Mail helps busy professionals manage their email efficiently using AI summaries and smart prioritization.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>AI-powered email summaries</li>
            <li>Priority inbox with smart categorization</li>
            <li>Thread summarization</li>
            <li>Voice commands and text-to-speech</li>
            <li>Draft management</li>
            <li>Customizable AI responses</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Setup Guide</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">1. Authentication</h3>
              <p className="text-gray-600">
                Sign in with your Google account to grant access to your Gmail. We use OAuth 2.0 for secure authentication.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">2. API Keys</h3>
              <p className="text-gray-600">
                Add your OpenAI and ElevenLabs API keys in Settings for AI features. Keys are encrypted and stored securely.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">3. Label Selection</h3>
              <p className="text-gray-600">
                Choose which Gmail labels to include in your priority inbox through Settings.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Data Storage</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Database Storage</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>User profiles and authentication data</li>
                <li>API keys (encrypted)</li>
                <li>User preferences and settings</li>
                <li>Email summaries and analysis</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Local Storage</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Authentication tokens</li>
                <li>Email cache (30-minute expiry)</li>
                <li>Draft emails</li>
                <li>UI preferences</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">Integration Guide</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              To replace mock data with real Gmail integration:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Set up Google OAuth 2.0 credentials</li>
              <li>Configure Gmail API access</li>
              <li>Update API endpoints in constants</li>
              <li>Implement real-time email sync</li>
              <li>Add error handling for API calls</li>
            </ol>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">API Documentation</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Our API uses RESTful endpoints with JWT authentication. Key endpoints:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>/api/auth/* - Authentication endpoints</li>
              <li>/api/gmail/* - Email management</li>
              <li>/api/settings/* - User preferences</li>
              <li>/api/summaries/* - AI processing</li>
            </ul>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default HelpPage;