import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminIndex() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/xws-admin/login');
  }, [router]);

  return null;
}
