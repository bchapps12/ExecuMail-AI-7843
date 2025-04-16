import React from 'react';
import { motion } from 'framer-motion';
import { IoTimeOutline, IoPersonOutline, IoMailOutline } from 'react-icons/io5';

const ThreadSummary = ({ thread }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 rounded-lg p-4 mt-4"
    >
      <h4 className="font-medium text-gray-800 mb-2 flex items-center">
        <IoMailOutline className="mr-2" />
        Thread Summary
      </h4>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <IoTimeOutline className="mr-2" />
          {thread.duration} ({thread.emails.length} emails)
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <IoPersonOutline className="mr-2" />
          {thread.participants} participants
        </div>

        <div className="bg-white rounded p-3">
          <p className="text-sm text-gray-700">{thread.summary}</p>
        </div>

        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-700">Key Points:</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {thread.keyPoints.map((point, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ThreadSummary;