import Layout from '@/components/Layout';

const sections = [
  {
    title: 'Engagement scope',
    body: [
      'Statements of work (SOWs) or proposals describe deliverables, rates, timelines, and responsibilities.',
      'Work outside the documented scope requires a written change request and updated estimate.',
      'Either party may end an engagement with 14 days notice unless otherwise defined in the SOW.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'You own the final deliverables upon full payment. We retain ownership of internal tools, accelerators, and reusable IP used to deliver the work.',
      'Open-source dependencies remain governed by their respective licenses.',
    ],
  },
  {
    title: 'Payments',
    body: [
      'Invoices are due within 15 days unless a different schedule is agreed in writing.',
      'Past-due invoices may pause delivery. Late fees may apply (1.5% per month).',
      'All fees are exclusive of taxes; applicable taxes will be itemized separately.',
    ],
  },
  {
    title: 'Confidentiality & data',
    body: [
      'Both parties agree to keep confidential information secret and use it solely for the engagement.',
      'We comply with reasonable security measures and notify you of any incidents affecting your data.',
    ],
  },
  {
    title: 'Warranties & liability',
    body: [
      'Work is provided “as-is.” We warrant that we will deliver services in a professional, workmanlike manner.',
      'In no event shall either party be liable for consequential or indirect damages.',
      'Total liability is limited to the fees paid to Xws Solution in the previous three (3) months.',
    ],
  },
];

export default function TermsPage() {
  return (
    <Layout title="Terms of Service">
      <section className="container-responsive py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">Terms of service</p>
          <h1 className="text-4xl font-semibold mb-6">Working with Xws Solution.</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
            These terms, together with any signed statements of work, form the agreement between you (“Client”) and Xws Solution (“Provider”).
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
            Questions? Email <a href="mailto:legal@xwssolution.com" className="text-brand font-semibold">legal@xwssolution.com</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
}

