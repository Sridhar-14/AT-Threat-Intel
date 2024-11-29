import React from 'react';
import { Server, Shield, Clock } from 'lucide-react';
import { Application } from '../types/application';

interface ApplicationHeaderProps {
  application: Application;
}

const statusColors = {
  healthy: 'text-green-600',
  'at-risk': 'text-yellow-600',
  critical: 'text-red-600'
};

export function ApplicationHeader({ application }: ApplicationHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Server className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{application.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm text-gray-500">Version {application.version}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className={`text-sm font-medium ${statusColors[application.status]}`}>
                {application.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Environment</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {application.environment.toUpperCase()}
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Last Deployment</span>
            </div>
            <span className="text-sm font-medium text-gray-900">
              {new Date(application.lastDeployment).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}