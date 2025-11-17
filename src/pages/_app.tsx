import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '@/styles/globals.css';
import '@/styles/theme.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { Inter, Poppins } from 'next/font/google';

const display = Poppins({ subsets: ['latin'], weight: ['500','600','700'], variable: '--font-display' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export default function App({ Component, pageProps }: AppProps) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
          mutations: {},
        },
      })
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        import('@/lib/api').then((m) => m.setAuthToken(token));
      }
    }
  }, []);

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className={`${display.variable} ${body.variable}`}>
          <Component {...pageProps} />
          <Toaster richColors position="top-right" />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
// import type { AppProps } from 'next/app';
// import { ThemeProvider } from 'next-themes';
// import '@/styles/globals.css';
// import '@/styles/theme.css';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useEffect, useState } from 'react';
// import { Toaster, toast } from 'sonner';
// import { Inter, Poppins } from 'next/font/google';

// const display = Poppins({ subsets: ['latin'], weight: ['500','600','700'], variable: '--font-display' });
// const body = Inter({ subsets: ['latin'], variable: '--font-body' });

// export default function App({ Component, pageProps }: AppProps) {
//   const [client] = useState(
//     () =>
//       new QueryClient({
//         defaultOptions: {
//           queries: {
//             retry: 1,
//             onError: (err: unknown) => {
//               const message = (err as any)?.message || 'Something went wrong';
//               toast.error(message);
//             },
//           },
//           mutations: {
//             onError: (err: unknown) => {
//               const message = (err as any)?.message || 'Action failed';
//               toast.error(message);
//             },
//           },
//         },
//       })
//   );
//   // Hydrate auth token for client-side API calls after refresh
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const token = localStorage.getItem('authToken');
//       if (token) {
//         // dynamic import to avoid circular import at module init
//         import('@/lib/api').then((m) => m.setAuthToken(token));
//       }
//     }
//   }, []);
//   return (
//     <QueryClientProvider client={client}>
//       <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//         <div className={`${display.variable} ${body.variable}`}>
//           <Component {...pageProps} />
//           <Toaster richColors position="top-right" />
//         </div>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }


