
import React from 'react';
import { type Employee } from '../types';
import { LogOutIcon, UserCircleIcon, BuildingOfficeIcon, BriefcaseIcon, KeyIcon } from './Icons';

interface EmployeeProfileProps {
  employee: Employee;
  onLogout: () => void;
}

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({ employee, onLogout }) => {
  return (
    <div className="w-full p-6 text-white animate-fade-in">
      <div className="text-center">
        <img
          src={employee.imageUrl}
          alt={employee.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-500 shadow-lg"
        />
        <h2 className="text-3xl font-bold">{employee.name}</h2>
        <p className="text-green-400 font-semibold text-lg">Verification Successful</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <UserCircleIcon className="w-6 h-6 text-blue-400 mr-4"/>
            <div>
                <span className="text-sm text-gray-400">Employee ID</span>
                <p className="font-mono">{employee.id}</p>
            </div>
        </div>
        <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <BriefcaseIcon className="w-6 h-6 text-blue-400 mr-4"/>
            <div>
                <span className="text-sm text-gray-400">Position</span>
                <p>{employee.position}</p>
            </div>
        </div>
        <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-400 mr-4"/>
            <div>
                <span className="text-sm text-gray-400">Department</span>
                <p>{employee.department}</p>
            </div>
        </div>
        <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
            <KeyIcon className="w-6 h-6 text-blue-400 mr-4"/>
            <div>
                <span className="text-sm text-gray-400">Access Level</span>
                <p className="font-bold text-xl">{employee.accessLevel}</p>
            </div>
        </div>
      </div>
      
      <button
        onClick={onLogout}
        className="mt-8 w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-800"
      >
        <LogOutIcon className="w-5 h-5 mr-2" />
        Log Out
      </button>
    </div>
  );
};

export default EmployeeProfile;
