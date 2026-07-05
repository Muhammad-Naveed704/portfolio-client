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
    title: 'Agreement',
    body: [
      `By accessing ${SITE_URL}, you agree to these Terms of Service and our Privacy Policy and Cookie Policy.`,
      `These terms apply to all visitors and users of the ${SITE_NAME} website.`,
      `For contracted client work, additional statements of work (SOWs) may also apply.`,
    ],
  },
  {
    title: 'Website use',
    body: [
      'You may browse our site for lawful purposes only.',
      'You must not attempt to disrupt, hack, scrape excessively, or misuse any part of the website.',
      'Content on this site (text, images, code samples, branding) is owned by XWS Solution unless otherwise stated.',
      'You may not copy, redistribute, or commercially exploit site content without written permission.',
    ],
  },
  {
    title: 'Advertising',
    body: [
      'This website displays advertisements served by Google AdSense and possibly other ad networks.',
      'We are not responsible for the content of third-party advertisements or external sites linked from ads.',
      'Clicking on ads or external links is at your own risk. Review the advertiser\'s terms and privacy practices separately.',
      'Ad placement does not constitute an endorsement of advertised products or services.',
    ],
  },
  {
    title: 'Engagement scope (clients)',
    body: [
      'Statements of work (SOWs) or proposals describe deliverables, rates, timelines, and responsibilities.',
      'Work outside the documented scope requires a written change request and updated estimate.',
      'Either party may end an engagement with 14 days notice unless otherwise defined in the SOW.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'Clients own final deliverables upon full payment. We retain ownership of internal tools, accelerators, and reusable IP.',
      'Open-source dependencies remain governed by their respective licenses.',
      'Website content, trademarks, and branding remain the property of XWS Solution.',
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
    title: 'Disclaimer',
    body: [
      'Website content is provided for general information only and does not constitute professional advice.',
      'We make reasonable efforts to keep information accurate but do not guarantee completeness or timeliness.',
      'The site is provided "as is" without warranties of any kind, express or implied.',
      'We are not liable for any loss or damage arising from use of this website or reliance on its content.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, XWS Solution shall not be liable for indirect, incidental, or consequential damages.',
      'For contracted services, total liability is limited to fees paid in the previous three (3) months unless otherwise agreed in writing.',
      'Some jurisdictions do not allow certain limitations; in those cases, our liability is limited to the minimum permitted by law.',
    ],
  },
  {
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of Pakistan, without regard to conflict-of-law principles.',
      'Disputes shall first be addressed through good-faith negotiation before pursuing formal remedies.',
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service | Legal | XWS Solution"
        description="XWS Solution Terms of Service: website use, advertising, intellectual property, disclaimers, and client engagement terms."
        keywords="Terms of Service, Legal Terms, Website Terms, Google AdSense, Disclaimer, XWS Solution Terms"
        canonical={`${SITE_URL}/terms`}
        noindex={false}
      />
      <Layout title="Terms of Service">
        <section className="container-responsive py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">
              Terms of service
            </p>
            <h1 className="text-4xl font-semibold mb-6">Using the {SITE_NAME} website.</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
              These terms govern your use of {SITE_URL} and form the basis for working with {SITE_NAME} as a
              client. Effective date: July 2026.
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
