import Link from 'next/link';
import { Blog } from '@/lib/api';
import { assetUrl } from '@/lib/url';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogListProps {
  blogs: Blog[];
  loading?: boolean;
}

export default function BlogList({ blogs, loading }: BlogListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogs.map((blog, index) => (
        <motion.article
          key={blog._id || blog.slug}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -5 }}
        >
          <Link href={`/insights/${blog.slug}`}>
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
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
                  <span className="text-6xl">📝</span>
                </div>
              )}
              {blog.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-brand text-white text-xs font-semibold shadow-lg">
                    Featured
                  </span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-black/80 text-white grid place-items-center group-hover:bg-brand transition-colors opacity-0 group-hover:opacity-100">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="inline-block px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
                  {blog.category}
                </span>
                {blog.tags && blog.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs">
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
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
                    {blog.readingTime} min
                  </span>
                )}
                {blog.views && (
                  <span className="text-gray-400">
                    {blog.views} views
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-brand transition-colors mb-2">
                {blog.title}
              </h3>
              {blog.excerpt && (
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
              )}
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
