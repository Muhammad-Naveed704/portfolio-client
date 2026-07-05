import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import {
  ADSENSE_PUBLISHER_ID,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_E164,
  SITE_URL,
} from '@/lib/site-contact';

const sections = [
  {
    title: 'Who we are',
    body: [
      `${SITE_NAME} operates ${SITE_URL}, a software house website based in Karachi, Pakistan.`,
      `Publisher contact: ${SITE_EMAIL} | ${SITE_PHONE_DISPLAY}.`,
    ],
  },
  {
    title: 'Data we collect',
    body: [
      'Contact details you share via forms, email, or chat (name, email, company, phone).',
      'Project context, requirements, and supporting assets you send to scope work.',
      'Usage data such as pages visited, browser type, device type, and approximate location (via analytics).',
      'Advertising-related data collected by Google AdSense and its partners when ads are displayed on this site.',
    ],
  },
  {
    title: 'How we use your data',
    body: [
      'Respond to project inquiries, send proposals, and deliver contracted services.',
      'Operate, secure, and improve our website, internal tooling, and infrastructure.',
      'Display advertisements through Google AdSense to support free access to our content.',
      'Measure site traffic and ad performance to improve user experience.',
      'Send operational updates and optional product or content announcements (opt-out anytime).',
    ],
  },
  {
    title: 'Google AdSense & advertising',
    body: [
      `This site uses Google AdSense (Publisher ID: ${ADSENSE_PUBLISHER_ID}) to display third-party advertisements.`,
      'Google and its partners may use cookies (including the DoubleClick DART cookie) to serve ads based on your visits to this and other websites.',
      'These cookies enable Google and its partners to serve personalized or non-personalized ads and measure ad effectiveness.',
      'You can opt out of personalized advertising by visiting https://adssettings.google.com.',
      'Learn how Google uses data from sites that use its services: https://policies.google.com/technologies/partner-sites.',
      'Learn about Google advertising technologies: https://policies.google.com/technologies/ads.',
    ],
  },
  {
    title: 'Cookies',
    body: [
      'We use essential cookies for site functionality and security.',
      'Analytics and advertising cookies may be set by us and third parties such as Google.',
      'You can manage cookie preferences via our cookie banner or your browser settings.',
      'See our Cookie Policy for full details on types of cookies and how to control them.',
    ],
  },
  {
    title: 'Sharing & retention',
    body: [
      'We do not sell or rent your personal data.',
      'We share information only with vetted service providers (hosting, email, analytics, advertising) required to operate the site and deliver services.',
      'Google AdSense may collect and process data according to Google\'s own privacy policies.',
      'Data is retained for as long as needed to serve you, meet legal obligations, or maintain accurate business records.',
      `You may request access, updates, or deletion at any time by emailing ${SITE_EMAIL}.`,
    ],
  },
  {
    title: 'Your rights',
    body: [
      'You may request access to, correction of, or deletion of your personal data.',
      'You may withdraw consent for non-essential cookies at any time via browser settings.',
      'EU/EEA and UK users may have additional rights under GDPR, including data portability and objection to processing.',
      'We will respond to privacy requests within a reasonable timeframe.',
    ],
  },
  {
    title: 'Security & compliance',
    body: [
      'We use encryption in transit and at rest, role-based access controls, and continuous monitoring where applicable.',
      'Third-party vendors are reviewed for security and compliance readiness.',
      'Incident response procedures ensure you are notified promptly if any data risk affecting your information is detected.',
    ],
  },
  {
    title: 'Children\'s privacy',
    body: [
      'This site is not directed at children under 13. We do not knowingly collect personal information from children.',
      `If you believe a child has provided us data, contact us at ${SITE_EMAIL} and we will delete it promptly.`,
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Data Protection | XWS Solution"
        description="XWS Solution Privacy Policy: data collection, Google AdSense advertising, cookies, your rights, and how to contact us. Publisher: mnaveed2862@gmail.com."
        keywords="Privacy Policy, Data Protection, Google AdSense, Cookies, GDPR, Advertising, XWS Solution Privacy"
        canonical={`${SITE_URL}/privacy`}
        noindex={false}
      />
      <Layout title="Privacy Policy">
        <section className="container-responsive py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">
              Privacy policy
            </p>
            <h1 className="text-4xl font-semibold mb-6">How {SITE_NAME} protects your data.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              This policy describes what we collect, how we use it (including advertising through Google AdSense),
              and the rights you have. Effective date: July 2026.
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
