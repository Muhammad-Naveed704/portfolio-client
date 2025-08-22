import { useEffect, useState } from 'react';
import { setAuthToken } from '@/lib/api';

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const t = localStorage.getItem('authToken');
    if (t) {
      setToken(t);
      setAuthToken(t);
    }
  }, []);
  return { token, setToken };
}


