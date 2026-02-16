import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchBlogs, Blog } from '@/lib/api';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogPosts() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBlogs({ limit: 3, featured: true });
        setBlogs(data.blogs);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="container-responsive py-16" id="blog">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">
              From my<br />
              <span className="text-3xl">blog post</span>
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-3" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return (
      <section className="container-responsive py-16" id="blog">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold leading-tight">
              From my<br />
              <span className="text-3xl">blog post</span>
            </h3>
          </div>
          <Link href="/insights" className="px-4 py-2 rounded-full bg-brand text-white text-sm hover:bg-brand/90 transition-colors">
            See All
          </Link>
        </div>
        <p className="mt-6 text-gray-500 dark:text-gray-400">No blog posts available yet.</p>
      </section>
    );
  }

  return (
    <section className="container-responsive py-16" id="blog">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold leading-tight">
            From my<br />
            <span className="text-3xl">blog post</span>
          </h3>
        </div>
        <Link 
          href="/insights" 
          className="px-4 py-2 rounded-full bg-brand text-white text-sm hover:bg-brand/90 transition-colors flex items-center gap-2"
        >
          See All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <motion.article
            key={blog._id || blog.slug}
            className="group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link href={`/insights/${blog.slug}`}>
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                {blog.featuredImage ? (
                  <Image
                    src={assetUrl(blog.featuredImage)}
                    alt={blog.title}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-brand/20 to-purple-500/20 flex items-center justify-center">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
                {blog.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-brand text-white text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-black/80 text-white grid place-items-center group-hover:bg-brand transition-colors opacity-0 group-hover:opacity-100">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
                    {blog.category}
                  </span>
                  {blog.tags && blog.tags.length > 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {blog.tags[0]}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {blog.publishedAt 
                      ? new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : new Date(blog.createdAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    }
                  </span>
                  {blog.readingTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {blog.readingTime} min read
                    </span>
                  )}
                </div>
                <h4 className="text-lg font-semibold leading-snug text-gray-900 dark:text-white group-hover:text-brand transition-colors">
                  {blog.title}
                </h4>
                {blog.excerpt && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {blog.excerpt}
                  </p>
                )}
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
