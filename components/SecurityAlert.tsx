
import React from 'react';
import { ShieldExclamationIcon, ArrowPathIcon } from './Icons';

interface SecurityAlertProps {
  onRetry: () => void;
}

const SecurityAlert: React.FC<SecurityAlertProps> = ({ onRetry }) => {
  return (
    <div className="w-full p-8 text-center text-white animate-fade-in">
      <div className="mx-auto mb-6 h-24 w-24 flex items-center justify-center rounded-full bg-red-900 border-4 border-red-700">
        <ShieldExclamationIcon className="h-12 w-12 text-red-400" />
      </div>
      <h2 className="text-3xl font-bold text-red-400">Security Alert</h2>
      <p className="text-gray-300 mt-2 mb-6">
        Unrecognized individual detected. Verification failed. Please ensure your face is well-lit and centered.
      </p>
      <button
        onClick={onRetry}
        className="inline-flex items-center justify-center px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-800"
      >
        <ArrowPathIcon className="w-5 h-5 mr-2" />
        Try Again
      </button>
    </div>
  );
};

export default SecurityAlert;
