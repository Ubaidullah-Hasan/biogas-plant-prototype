import { useState, useEffect } from 'react';
import { mockDashboardData } from '../data/mockData';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API network latency for a realistic loading state
    const timer = setTimeout(() => {
      try {
        setData(mockDashboardData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error };
}
