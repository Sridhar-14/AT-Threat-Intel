import React from 'react';
import { ApplicationHeader } from './components/ApplicationHeader';
import { MetricsPanel } from './components/MetricsPanel';
import { ThreatList } from './components/ThreatList';
import { ThreatCounter } from './components/ThreatCounter';
import { useThreats } from './hooks/useThreats';
import { useMetrics } from './hooks/useMetrics';
import { mockApplication } from './utils/mockData';

function App() {
  const { threats, loading: threatsLoading, error: threatsError } = useThreats();
  const { metrics, loading: metricsLoading, error: metricsError } = useMetrics();

  if (threatsLoading || metricsLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading security data...</p>
        </div>
      </div>
    );
  }

  if (threatsError || metricsError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-red-600">{threatsError || metricsError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ApplicationHeader application={mockApplication} />
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="col-span-3">
            <MetricsPanel metrics={metrics} />
          </div>
          <div className="col-span-1">
            <ThreatCounter count={threats.length} />
          </div>
        </div>
        <ThreatList threats={threats} />
      </div>
    </div>
  );
}

export default App;