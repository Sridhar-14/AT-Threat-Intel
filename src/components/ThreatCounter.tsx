import React from 'react';
import { Shield } from 'lucide-react';

interface ThreatCounterProps {
  count: number;
}

export function ThreatCounter({ count }: ThreatCounterProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Threats Detected</h2>
          <p className="text-sm text-gray-500">Last Hour</p>
        </div>
        <Shield className="w-8 h-8 text-red-500" />
      </div>
      <div className="mt-4">
        <span className="text-4xl font-bold text-red-600">{count}</span>
      </div>
    </div>
  );
}