import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONSENT_KEY = 'xws-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) setVisible(true);
  }, []);

  function saveConsent(value: 'accepted' | 'essential') {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gray-950/95 backdrop-blur-md shadow-2xl p-5 sm:p-6 text-white">
        <p className="text-sm sm:text-base text-white/90 leading-relaxed">
          We use cookies to run this site, understand traffic, and show ads through Google AdSense. By clicking
          &quot;Accept all&quot;, you agree to our use of cookies. Read our{' '}
          <Link href="/cookies" className="text-[var(--xws-accent)] hover:underline font-medium">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-[var(--xws-accent)] hover:underline font-medium">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => saveConsent('accepted')}
            className="px-5 py-2.5 rounded-xl bg-[var(--xws-accent)] text-gray-950 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={() => saveConsent('essential')}
            className="px-5 py-2.5 rounded-xl border border-white/20 text-white/90 text-sm font-medium hover:border-white/40 transition-colors"
          >
            Essential only
          </button>
        </div>
      </div>
    </div>
  );
}
