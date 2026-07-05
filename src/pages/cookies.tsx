import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import {
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_E164,
  SITE_URL,
} from '@/lib/site-contact';

const sections = [
  {
    title: 'What are cookies?',
    body: [
      'Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, keep sessions secure, and understand how pages are used.',
    ],
  },
  {
    title: 'How we use cookies',
    body: [
      'Essential cookies keep core features working (navigation, security, and form submissions).',
      'Analytics cookies help us understand traffic and improve content and performance.',
      'Advertising cookies (including Google AdSense) help show relevant ads and measure ad performance on this site.',
    ],
  },
  {
    title: 'Third-party cookies',
    body: [
      'Google AdSense may place cookies to serve and personalize ads based on your visits to this and other websites.',
      'Google may use the DoubleClick DART cookie when displaying ads through the AdSense program.',
      'Third-party vendors, including Google, use cookies to serve ads based on a user\'s prior visits to this website or other websites.',
      'Google\'s use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.',
    ],
  },
  {
    title: 'Managing your preferences',
    body: [
      'You can accept or decline non-essential cookies using the banner shown on your first visit.',
      'You can change your browser settings to block or delete cookies at any time. Blocking cookies may affect site functionality.',
      'To opt out of personalized advertising by Google, visit Google Ads Settings: https://adssettings.google.com',
      'Learn how Google uses data from partner sites: https://policies.google.com/technologies/partner-sites',
      'For EU users, you may also visit www.aboutads.info to opt out of third-party personalized advertising.',
    ],
  },
  {
    title: 'Cookie retention',
    body: [
      'Session cookies are deleted when you close your browser.',
      'Persistent cookies remain for a set period (typically up to 12 months) unless you clear them sooner.',
      'Your cookie consent choice is stored locally on your device until you clear site data or change your preference.',
    ],
  },
];

export default function CookiesPage() {
  return (
    <>
      <SEO
        title="Cookie Policy | XWS Solution"
        description="Cookie Policy for XWS Solution (xws.digital): how we use cookies, Google AdSense advertising cookies, and how to manage your preferences."
        keywords="Cookie Policy, Cookies, Google AdSense, Advertising Cookies, Privacy, XWS Solution"
        canonical={`${SITE_URL}/cookies`}
        noindex={false}
      />
      <Layout title="Cookie Policy">
        <section className="container-responsive py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">
              Cookie policy
            </p>
            <h1 className="text-4xl font-semibold mb-6">How {SITE_NAME} uses cookies.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              This policy explains what cookies are placed on {SITE_URL}, why we use them, and how you can
              control them. Effective date: July 2026.
            </p>
            <div className="space-y-10">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                    {section.body.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-brand">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
              Questions? Email{' '}
              <a href={`mailto:${SITE_EMAIL}`} className="text-brand font-semibold">
                {SITE_EMAIL}
              </a>{' '}
              or call{' '}
              <a href={`tel:${SITE_PHONE_E164}`} className="text-brand font-semibold">
                {SITE_PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}
