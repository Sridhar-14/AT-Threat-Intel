import { useState, useEffect } from 'react';
import { Threat } from '../types/threat';
import { fetchThreats } from '../services/api';

export function useThreats(pollInterval = 30000) {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const fetchData = async () => {
      if (!mounted) return;
      
      try {
        const data = await fetchThreats();
        if (mounted) {
          setThreats(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to fetch threats data');
          // Avoid logging the entire error object
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          console.error('Error fetching threats:', errorMessage);
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

  return { threats, loading, error };
}