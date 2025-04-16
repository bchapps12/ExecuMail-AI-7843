import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoCloseOutline, IoSendOutline } from 'react-icons/io5';

const ReplyModal = ({ email, onClose, onSend }) => {
  const [context, setContext] = useState(email.context || '');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center sm:items-center p-4 z-50"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg"
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Quick Reply</h3>
            <button onClick={onClose} className="p-2">
              <IoCloseOutline className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-600">To: {email.from}</p>
            <p className="text-sm text-gray-600">Subject: Re: {email.subject}</p>
          </div>

          <div className="mb-4 bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Your Context:</h4>
            <p className="text-sm text-gray-600">{context}</p>
          </div>

          <button
            onClick={() => onSend(context)}
            className="w-full flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg transition-colors"
          >
            <IoSendOutline className="mr-2" />
            Generate & Send Reply
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReplyModal;