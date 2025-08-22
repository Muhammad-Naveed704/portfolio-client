import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            onError: (err: unknown) => {
              const message = (err as any)?.message || 'Something went wrong';
              toast.error(message);
            },
          },
          mutations: {
            onError: (err: unknown) => {
              const message = (err as any)?.message || 'Action failed';
              toast.error(message);
            },
          },
        },
      })
  );
  // Hydrate auth token for client-side API calls after refresh
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        // dynamic import to avoid circular import at module init
        import('@/lib/api').then((m) => m.setAuthToken(token));
      }
    }
  }, []);
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
        <Toaster richColors position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}


