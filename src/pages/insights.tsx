import Layout from '@/components/Layout';
import BlogPosts from '@/components/BlogPosts';

export default function InsightsPage() {
  return (
    <Layout title="Insights">
      <section className="container-responsive py-16 sm:py-24">
        <div className="max-w-3xl mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4">Insights</p>
          <h1 className="text-4xl font-semibold mb-4">Playbooks, engineering notes, and launch recaps.</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Field-tested guidance from designing AI products to scaling CI/CD, covering the lessons we apply inside Xws Solution engagements.
          </p>
        </div>
        <BlogPosts />
      </section>
    </Layout>
  );
}

