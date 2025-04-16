import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoMailUnreadOutline,
  IoTimeOutline,
  IoSendOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoGitBranchOutline,
  IoSaveOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
  IoMicOutline,
  IoMicOffOutline,
  IoRefreshOutline
} from 'react-icons/io5';
import PriorityBadge from './PriorityBadge';
import ThreadSummary from './ThreadSummary';

const EmailCard = ({ email, onReply, onSaveAsDraft }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showThreadSummary, setShowThreadSummary] = useState(false);
  const [context, setContext] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const speechSynthesis = window.speechSynthesis;
  const recognition = window.webkitSpeechRecognition ? new window.webkitSpeechRecognition() : null;

  const toggleSpeech = (e) => {
    e.stopPropagation();
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(email.summary);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const toggleRecording = (e) => {
    e.stopPropagation();
    if (!recognition) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setContext(prev => prev + ' ' + transcript);
      };
      recognition.onend = () => setIsRecording(false);
    }
    setIsRecording(!isRecording);
  };

  const handleGenerateReply = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneratedReply('Thank you for your email. I have reviewed the Q1 metrics and will attend the board meeting next week. I appreciate the comprehensive overview provided.');
    } catch (error) {
      console.error('Error generating reply:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-2 mb-2"
    >
      <motion.div layout="position" className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <IoMailUnreadOutline className="text-primary-500 mr-2 flex-shrink-0" />
          <span className="font-semibold text-gray-800 text-sm truncate">
            {email.from}
          </span>
        </div>
        <div className="flex items-center space-x-2 ml-2">
          <div className="flex items-center text-xs text-gray-500">
            <IoTimeOutline className="mr-1" />
            {email.time}
          </div>
          <PriorityBadge priority={email.priority} />
        </div>
      </motion.div>

      <motion.div
        layout="position"
        className="cursor-pointer mt-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-800 text-sm">{email.subject}</h3>
          {isExpanded ? (
            <IoChevronUpOutline className="w-4 h-4 text-gray-500 mt-1 ml-2 flex-shrink-0" />
          ) : (
            <IoChevronDownOutline className="w-4 h-4 text-gray-500 mt-1 ml-2 flex-shrink-0" />
          )}
        </div>
        
        <div className="bg-gray-50 rounded p-2 mt-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-xs font-medium text-gray-700">AI Summary</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSpeech(e);
              }}
              className="p-1 hover:bg-gray-200 rounded-full"
            >
              {isReading ? (
                <IoVolumeMuteOutline className="w-4 h-4 text-primary-500" />
              ) : (
                <IoVolumeHighOutline className="w-4 h-4 text-gray-500" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600">{email.summary}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-2">
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowThreadSummary(!showThreadSummary)}
                  className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  <IoGitBranchOutline className="mr-2" />
                  {showThreadSummary ? 'Hide Thread' : 'View Thread'}
                </button>
                <button
                  onClick={() => onSaveAsDraft(email, context || generatedReply)}
                  className="flex-1 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  <IoSaveOutline className="mr-2" />
                  Save Draft
                </button>
              </div>

              {showThreadSummary && email.thread && (
                <ThreadSummary thread={email.thread} />
              )}

              <div className="relative">
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add context for AI reply or edit generated response..."
                  className="w-full h-32 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                />
                <div className="absolute right-2 top-2 flex space-x-1">
                  <button
                    onClick={toggleRecording}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    {isRecording ? (
                      <IoMicOffOutline className="w-5 h-5 text-red-500" />
                    ) : (
                      <IoMicOutline className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {!generatedReply && (
                    <button
                      onClick={handleGenerateReply}
                      disabled={isGenerating}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <IoRefreshOutline className={`w-5 h-5 text-gray-500 ${isGenerating ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
                {generatedReply && !context && (
                  <div className="mt-2 text-sm text-gray-600">
                    {generatedReply}
                  </div>
                )}
              </div>

              <motion.button
                layout="position"
                onClick={() => onReply(email)}
                className="flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <IoSendOutline className="mr-2" />
                Send Reply
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailCard;