import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoMailUnreadOutline,
  IoTimeOutline,
  IoSendOutline,
  IoChevronDownOutline,
  IoChevronUpOutline,
  IoDocumentTextOutline,
  IoVolumeHighOutline,
  IoVolumeMuteOutline,
  IoMicOutline,
  IoMicOffOutline
} from 'react-icons/io5';
import PriorityBadge from './PriorityBadge';

const EmailCard = ({ email, onReply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [context, setContext] = useState('');
  const [isReading, setIsReading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const speechSynthesis = window.speechSynthesis;
  const recognition = window.webkitSpeechRecognition ? new window.webkitSpeechRecognition() : null;

  const toggleSpeech = () => {
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

  const toggleRecording = () => {
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-3 mb-3"
    >
      <motion.div layout="position" className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <IoMailUnreadOutline className="text-primary-500 mr-2" />
          <span className="font-semibold text-gray-800 text-sm truncate max-w-[150px]">
            {email.from}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center text-xs text-gray-500">
            <IoTimeOutline className="mr-1" />
            {email.time}
          </div>
          <PriorityBadge priority={email.priority} />
        </div>
      </motion.div>

      <motion.div
        layout="position"
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-medium text-gray-800 text-sm mb-2">{email.subject}</h3>
        
        <div className="bg-gray-50 rounded p-2">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-medium text-gray-700">AI Summary</h4>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSpeech();
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
            {isExpanded ? (
              <IoChevronUpOutline className="w-4 h-4 text-gray-500" />
            ) : (
              <IoChevronDownOutline className="w-4 h-4 text-gray-500" />
            )}
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
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {email.keyPoints && (
              <ul className="mt-2 text-sm text-gray-600 pl-2">
                {email.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-center mt-1">
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    <span className="text-xs">{point}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-3 space-y-2">
              <button
                onClick={() => window.alert('View original email')}
                className="flex items-center justify-center w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <IoDocumentTextOutline className="mr-2" />
                View Original
              </button>

              <div className="relative">
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Add context for AI reply..."
                  className="w-full h-20 p-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10"
                />
                <button
                  onClick={toggleRecording}
                  className="absolute right-2 top-2 p-2 hover:bg-gray-100 rounded-full"
                >
                  {isRecording ? (
                    <IoMicOffOutline className="w-5 h-5 text-red-500" />
                  ) : (
                    <IoMicOutline className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>

              <motion.button
                layout="position"
                onClick={() => onReply({ ...email, context })}
                className="flex items-center justify-center w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors text-sm"
              >
                <IoSendOutline className="mr-2" />
                Generate AI Reply
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EmailCard;