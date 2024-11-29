import React from 'react';
import { AlertTriangle, Activity } from 'lucide-react';
import { Threat } from '../types/threat';

interface ThreatListProps {
  threats: Threat[];
}

const severityColors = {
  low: 'bg-yellow-100 text-yellow-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
  critical: 'bg-purple-100 text-purple-800'
};

const statusColors = {
  active: 'bg-red-100 text-red-800',
  mitigated: 'bg-green-100 text-green-800',
  investigating: 'bg-blue-100 text-blue-800'
};

export function ThreatList({ threats }: ThreatListProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Recent Threats</h2>
        <Activity className="w-6 h-6 text-gray-600" />
      </div>
      <div className="space-y-4">
        {threats.map((threat) => (
          <div key={threat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className={`w-5 h-5 ${
                  threat.severity === 'critical' ? 'text-red-600' : 'text-yellow-600'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-900">{threat.type.replace('_', ' ').toUpperCase()}</h3>
                  <p className="text-sm text-gray-500">{threat.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${severityColors[threat.severity]}`}>
                  {threat.severity}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${statusColors[threat.status]}`}>
                  {threat.status}
                </span>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Source IP: {threat.sourceIp}</span>
                <span>Endpoint: {threat.endpoint}</span>
                <span>{new Date(threat.timestamp).toLocaleString()}</span>
              </div>
              {threat.impact && (
                <div className="text-sm text-gray-500">
                  <span>Impact: {threat.impact.affectedUsers} users affected</span>
                  {threat.impact.affectedServices && (
                    <span> • Services: {threat.impact.affectedServices.join(', ')}</span>
                  )}
                </div>
              )}
              {threat.mitigation && (
                <div className="text-sm text-green-600">
                  Mitigation: {threat.mitigation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}