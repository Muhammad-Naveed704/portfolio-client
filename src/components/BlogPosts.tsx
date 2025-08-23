import Link from 'next/link';

type Post = {
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
};

const posts: Post[] = [
  {
    title: 'Design Unraveled: Behind the Scenes of UI/UX Magic',
    category: 'UI/UX Design',
    author: 'Jayesh Patil',
    date: '10 Nov, 2023',
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Sugee: Loan Management System for Rural Sector.',
    category: 'App Design',
    author: 'Jayesh Patil',
    date: '09 Oct, 2023',
    image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'Cinetrade: Innovative way to invest in Digital Media',
    category: 'App Design',
    author: 'Jayesh Patil',
    date: '13 Aug, 2023',
    image: 'https://images.unsplash.com/photo-1593720216276-0caa6452e004?q=80&w=1200&auto=format&fit=crop',
  },
];

export default function BlogPosts() {
  return (
    <section className="container-responsive py-16" id="blog">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold leading-tight">
            From my<br />
            <span className="text-3xl">blog post</span>
          </h3>
        </div>
        <Link href="/blog" className="px-4 py-2 rounded-full bg-brand text-white text-sm">See All</Link>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <article key={p.title} className="group">
            <div className="relative rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image} alt={p.title} className="w-full h-64 object-cover" />
              <button className="absolute bottom-3 right-3 w-12 h-12 rounded-full bg-black/80 text-white grid place-items-center group-hover:bg-brand transition-colors">↗</button>
            </div>
            <div className="mt-3 text-xs">
              <span className="inline-block px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 mr-3">{p.category}</span>
              <span className="text-gray-500">{p.author}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-500">{p.date}</span>
            </div>
            <h4 className="mt-2 text-base font-semibold leading-snug">{p.title}</h4>
          </article>
        ))}
      </div>
    </section>
  );
}


