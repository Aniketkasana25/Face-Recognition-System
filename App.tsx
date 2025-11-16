
import React, { useState, useCallback } from 'react';
import { VerificationStatus, type Employee } from './types';
import { EMPLOYEES } from './constants';
import CameraView from './components/CameraView';
import EmployeeProfile from './components/EmployeeProfile';
import SecurityAlert from './components/SecurityAlert';
import { ShieldCheckIcon, ShieldExclamationIcon, VideoCameraIcon } from './components/Icons';

const App: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(VerificationStatus.IDLE);
  const [verifiedEmployee, setVerifiedEmployee] = useState<Employee | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleVerification = useCallback(async (imageDataUrl: string) => {
    setVerificationStatus(VerificationStatus.VERIFYING);
    // Simulate API call to backend for facial recognition
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, you would send imageDataUrl to your backend.
    // Here, we simulate success or failure.
    const isSuccess = Math.random() > 0.3; // 70% chance of success

    if (isSuccess) {
      // Pick a random employee from the mock database
      const employee = EMPLOYEES[Math.floor(Math.random() * EMPLOYEES.length)];
      setVerifiedEmployee(employee);
      setVerificationStatus(VerificationStatus.SUCCESS);
    } else {
      setVerifiedEmployee(null);
      setVerificationStatus(VerificationStatus.FAILED);
    }
  }, []);

  const resetState = useCallback(() => {
    setVerificationStatus(VerificationStatus.IDLE);
    setVerifiedEmployee(null);
    setCameraError(null);
  }, []);

  const renderContent = () => {
    switch (verificationStatus) {
      case VerificationStatus.CAMERA_ACTIVE:
        return (
          <CameraView
            onCapture={handleVerification}
            onClose={() => setVerificationStatus(VerificationStatus.IDLE)}
            onError={setCameraError}
          />
        );
      case VerificationStatus.VERIFYING:
        return (
          <div className="flex flex-col items-center justify-center text-white text-center p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mb-4"></div>
            <h2 className="text-2xl font-semibold">Verifying Identity...</h2>
            <p className="text-gray-400 mt-2">Please wait while we analyze the biometric data.</p>
          </div>
        );
      case VerificationStatus.SUCCESS:
        return verifiedEmployee ? <EmployeeProfile employee={verifiedEmployee} onLogout={resetState} /> : null;
      case VerificationStatus.FAILED:
        return <SecurityAlert onRetry={resetState} />;
      case VerificationStatus.IDLE:
      default:
        return (
          <div className="text-center p-8">
             <div className="mx-auto mb-6 h-24 w-24 flex items-center justify-center rounded-full bg-gray-700">
               <ShieldCheckIcon className="h-12 w-12 text-blue-400" />
             </div>
            <h1 className="text-4xl font-bold text-white mb-2">Corporate Verification</h1>
            <p className="text-lg text-gray-400 mb-8">Secure access through facial recognition.</p>
            {cameraError && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                <strong className="font-bold">Camera Error:</strong>
                <span className="block sm:inline ml-2">{cameraError}</span>
              </div>
            )}
            <button
              onClick={() => {
                setCameraError(null);
                setVerificationStatus(VerificationStatus.CAMERA_ACTIVE);
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-800"
            >
              <VideoCameraIcon className="w-6 h-6 mr-3" />
              Start Verification
            </button>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <div className="w-full max-w-md mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="p-4 bg-gray-900 border-b border-gray-700 flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="min-h-[480px] flex items-center justify-center">
            {renderContent()}
        </div>
      </div>
       <footer className="text-center mt-8 text-gray-500 text-sm">
        <p>Powered by SecureCorp Biometrics</p>
        <p>&copy; 2024. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
