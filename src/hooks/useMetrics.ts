import { useState, useEffect } from 'react';
import { ApplicationMetrics } from '../types/application';
import { fetchMetrics } from '../services/api';

export function useMetrics(pollInterval = 30000) {
  const [metrics, setMetrics] = useState<ApplicationMetrics>({
    totalRequests: 0,
    suspiciousRequests: 0,
    blockedRequests: 0,
    averageResponseTime: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      if (!mounted) return;
      
      try {
        const data = await fetchMetrics();
        if (mounted) {
          setMetrics(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch metrics data');
          // Avoid logging the entire error object
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error('Error fetching metrics:', errorMessage);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [pollInterval]);

  return { metrics, loading, error };
}