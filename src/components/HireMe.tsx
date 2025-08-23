import Image from 'next/image';

export default function HireMe() {
  return (
    <section className="container-responsive py-16" id="hire">
      <div className="card bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="relative">
            <div className="absolute -left-6 top-10 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-brand/30 -z-10" />
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 mx-auto">
              <Image src="/avatar.jpg" alt="Hire Me" fill className="object-cover rounded-[24px]" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Why <span className="text-brand">Hire me</span>?
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 max-w-prose">
              I build modern, performant products with clean code and thoughtful UX. Let’s collaborate to ship your next idea fast and reliably.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 max-w-md">
              <div>
                <p className="text-2xl font-semibold">450+</p>
                <p className="text-xs text-gray-500">Project Completed</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">450+</p>
                <p className="text-xs text-gray-500">Project Completed</p>
              </div>
            </div>
            <a href="/contact" className="mt-6 inline-block px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800">Hire me</a>
          </div>
        </div>
      </div>
    </section>
  );
}


