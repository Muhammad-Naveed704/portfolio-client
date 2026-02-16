import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import BlogList from '@/components/BlogList';
import { fetchBlogs, fetchBlogCategories, fetchBlogTags, Blog } from '@/lib/api';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { motion } from 'framer-motion';
import { Search, Filter, X, Tag as TagIcon, Calendar, TrendingUp } from 'lucide-react';

type Props = {
  initialBlogs: Blog[];
  initialCategories: string[];
  initialTags: string[];
  totalPages: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  try {
    const page = parseInt(query.page as string) || 1;
    const category = query.category as string;
    const tag = query.tag as string;
    const search = query.search as string;
    const featured = query.featured === 'true' ? true : undefined;

    const [blogsData, categories, tags] = await Promise.all([
      fetchBlogs({
        page,
        limit: 12,
        category,
        tag,
        search,
        featured,
      }),
      fetchBlogCategories(),
      fetchBlogTags(),
    ]);

    return {
      props: {
        initialBlogs: blogsData.blogs,
        initialCategories: categories,
        initialTags: tags,
        totalPages: blogsData.pagination.pages,
      },
    };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return {
      props: {
        initialBlogs: [],
        initialCategories: [],
        initialTags: [],
        totalPages: 0,
      },
    };
  }
};

export default function InsightsPage({ initialBlogs, initialCategories, initialTags, totalPages }: Props) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showFeatured, setShowFeatured] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [tags, setTags] = useState<string[]>(initialTags);

  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      try {
        const data = await fetchBlogs({
          page: currentPage,
          limit: 12,
          category: selectedCategory || undefined,
          tag: selectedTag || undefined,
          search: searchQuery || undefined,
          featured: showFeatured || undefined,
        });
        setBlogs(data.blogs);
      } catch (err) {
        console.error('Failed to load blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [currentPage, selectedCategory, selectedTag, searchQuery, showFeatured]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTag(null);
    setShowFeatured(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedCategory || selectedTag || searchQuery || showFeatured;

  return (
    <>
      <SEO
        title="Insights & Blog | Engineering Notes | Xws Solution"
        description="Read insights, engineering notes, and launch recaps from Xws Solution. Field-tested guidance on SaaS Development, Web Development, DevOps, AI & Robotics, CI/CD, and scaling digital products. Learn from our experience building production-ready solutions."
        keywords="Xws Solution Blog, Software Development Blog, Web Development Insights, DevOps Best Practices, AI Development Blog, Engineering Notes, Tech Blog, SaaS Development Tips, CI/CD Best Practices, Software Engineering Blog, Technology Insights, Development Tutorials"
        canonical="https://xws.digital/insights"
      />
      <Layout title="Insights">
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
          {/* Hero Section */}
          <section className="container-responsive py-16 sm:py-24">
            <motion.div
              className="max-w-3xl mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.4em] text-brand font-medium mb-4">Insights</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Playbooks, engineering notes, and launch recaps.
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Field-tested guidance from designing AI products to scaling CI/CD, covering the lessons we apply inside Xws Solution engagements.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                  />
                </div>
              </form>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  onClick={() => setShowFeatured(!showFeatured)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                    showFeatured
                      ? 'bg-brand text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Featured
                </button>

                {categories.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Categories:</span>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(selectedCategory === cat ? null : cat);
                          setCurrentPage(1);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                          selectedCategory === cat
                            ? 'bg-brand text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-all flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <TagIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Tags:</span>
                  {tags.slice(0, 10).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(selectedTag === tag ? null : tag);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-brand text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Blog List */}
            <BlogList blogs={blogs} loading={loading} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </div>
      </Layout>
    </>
  );
}
