import Layout from '@/components/Layout';

const sections = [
  {
    title: 'Data we collect',
    body: [
      'Contact details you share via forms, email, or chat (name, email, company, phone).',
      'Project context, requirements, and supporting assets you send to scope work.',
      'Usage analytics from our website (via privacy-friendly tooling) to improve content and performance.',
    ],
  },
  {
    title: 'How we use your data',
    body: [
      'Respond to project inquiries, send proposals, and deliver contracted services.',
      'Operate, secure, and improve our website, internal tooling, and infrastructure.',
      'Send operational updates and optional product or content announcements (opt-out anytime).',
    ],
  },
  {
    title: 'Sharing & retention',
    body: [
      'We do not sell or rent your data. We only share information with vetted sub-processors required to deliver services (hosting, email, payment, analytics).',
      'Data is retained for as long as it is needed to serve you, meet legal obligations, or maintain accurate business records.',
      'You may request access, updates, or deletion at any time by emailing privacy@xwssolution.com.',
    ],
  },
  {
    title: 'Security & compliance',
    body: [
      'We use encryption in transit and at rest, role-based access controls, and continuous monitoring.',
      'Vendors are reviewed for SOC2/GDPR readiness where applicable.',
      'Incident response runbooks ensure you are notified promptly if any data risk is detected.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy">
      <section className="container-responsive py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">Privacy policy</p>
          <h1 className="text-4xl font-semibold mb-6">How Xws Solution protects your data.</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            This policy describes what we collect, how we use it, and the rights you have. Effective date: {new Date().getFullYear()}.
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
            Questions? Email <a href="mailto:privacy@xwssolution.com" className="text-brand font-semibold">privacy@xwssolution.com</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}

