import React from 'react';
import { 
  IoFlameOutline, 
  IoTimeOutline, 
  IoCheckmarkCircleOutline 
} from 'react-icons/io5';

const PriorityBadge = ({ priority }) => {
  const badges = {
    urgent: {
      icon: IoFlameOutline,
      color: 'bg-red-100 text-red-600',
      label: 'U'
    },
    important: {
      icon: IoTimeOutline,
      color: 'bg-amber-100 text-amber-600',
      label: 'I'
    },
    normal: {
      icon: IoCheckmarkCircleOutline,
      color: 'bg-green-100 text-green-600',
      label: 'N'
    }
  };

  const { icon: Icon, color, label } = badges[priority];

  return (
    <div className={`flex items-center px-2 py-0.5 rounded-full ${color}`}>
      <Icon className="w-3 h-3" />
      <span className="text-xs font-medium ml-0.5">{label}</span>
    </div>
  );
};

export default PriorityBadge;