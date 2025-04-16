import React from 'react';
import { motion } from 'framer-motion';
import { IoCreateOutline, IoTrashOutline } from 'react-icons/io5';

const DraftsScreen = ({ drafts, onEdit, onDelete }) => {
  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Drafts</h2>
      
      <div className="space-y-4">
        {drafts.map(draft => (
          <motion.div
            key={draft.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-800">Re: {draft.originalEmail.subject}</h3>
                <p className="text-sm text-gray-500">To: {draft.originalEmail.from}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(draft)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <IoCreateOutline className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(draft.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <IoTrashOutline className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded p-3">
              <p className="text-sm text-gray-600">{draft.content}</p>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Last edited: {draft.lastEdited}
            </div>
          </motion.div>
        ))}
        
        {drafts.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No drafts saved yet
          </div>
        )}
      </div>
    </div>
  );
};

export default DraftsScreen;