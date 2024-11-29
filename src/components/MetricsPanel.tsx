import React from 'react';
import { Activity, AlertCircle, Shield, Clock } from 'lucide-react';
import { ApplicationMetrics } from '../types/application';

interface MetricsPanelProps {
  metrics: ApplicationMetrics;
}

export function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Requests</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.totalRequests.toLocaleString()}</p>
          </div>
          <Activity className="w-8 h-8 text-blue-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Suspicious Requests</p>
            <p className="text-2xl font-bold text-yellow-600">{metrics.suspiciousRequests.toLocaleString()}</p>
          </div>
          <AlertCircle className="w-8 h-8 text-yellow-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Blocked Requests</p>
            <p className="text-2xl font-bold text-red-600">{metrics.blockedRequests.toLocaleString()}</p>
          </div>
          <Shield className="w-8 h-8 text-red-500" />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Avg Response Time</p>
            <p className="text-2xl font-bold text-gray-900">{metrics.averageResponseTime.toFixed(2)}ms</p>
          </div>
          <Clock className="w-8 h-8 text-gray-500" />
        </div>
      </div>
    </div>
  );
}