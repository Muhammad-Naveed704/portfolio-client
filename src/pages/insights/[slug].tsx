import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { fetchBlog, fetchRelatedBlogs, Blog } from '@/lib/api';
import { GetServerSideProps } from 'next';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import BlogList from '@/components/BlogList';

type Props = {
  blog: Blog;
  relatedBlogs: Blog[];
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    if (!slug) {
      return { notFound: true };
    }

    const [blog, relatedBlogs] = await Promise.all([
      fetchBlog(slug),
      fetchRelatedBlogs(slug, 3),
    ]);

    return {
      props: {
        blog,
        relatedBlogs,
      },
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return { notFound: true };
  }
};

export default function BlogPostPage({ blog, relatedBlogs }: Props) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this article: ${blog.title}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={blog.seo?.metaTitle || `${blog.title} | Xws Solution`}
        description={blog.seo?.metaDescription || blog.excerpt}
        keywords={blog.seo?.keywords?.join(', ') || `${blog.category}, ${blog.tags?.join(', ')}`}
        canonical={`https://xws.digital/insights/${blog.slug}`}
        ogImage={blog.featuredImage ? assetUrl(blog.featuredImage) : undefined}
      />
      <Layout title={blog.title}>
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          {/* Back Button */}
          <section className="container-responsive pt-8">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
          </section>

          {/* Hero Image */}
          {blog.featuredImage && (
            <section className="container-responsive mb-12">
              <motion.div
                className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={assetUrl(blog.featuredImage)}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                {blog.featured && (
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 rounded-full bg-brand text-white text-sm font-semibold shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
              </motion.div>
            </section>
          )}

          {/* Article Content */}
          <article className="container-responsive max-w-4xl">
            {/* Header */}
            <motion.header
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 flex-wrap mb-4">
                <span className="px-4 py-2 rounded-full bg-brand/10 text-brand font-semibold text-sm">
                  {blog.category}
                </span>
                {blog.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
                {blog.title}
              </h1>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.author?.name || 'Xws Solution'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : new Date(blog.createdAt || '').toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                  </span>
                </div>
                {blog.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                )}
                {blog.views && (
                  <span>{blog.views} views</span>
                )}
                <button
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {blog.excerpt && (
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  {blog.excerpt}
                </p>
              )}
            </motion.header>

            {/* Content */}
            <motion.div
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="blog-content"
              />
            </motion.div>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
              <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                  Related Articles
                </h2>
                <BlogList blogs={relatedBlogs} />
              </section>
            )}
          </article>
        </div>
      </Layout>
    </>
  );
}
