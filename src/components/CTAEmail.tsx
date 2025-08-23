export default function CTAEmail() {
  return (
    <section className="container-responsive py-16" id="cta">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Have an Awsome Project <br className="hidden sm:block" /> Idea? <span className="text-brand">Let’s Discuss</span>
        </h2>
        <form className="mt-6 mx-auto max-w-xl flex items-center bg-white dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-800 px-2 py-1 shadow">
          <span className="inline-flex w-8 h-8 rounded-full bg-brand/20 text-brand items-center justify-center mr-2">✉</span>
          <input className="flex-1 bg-transparent outline-none px-2 py-2" placeholder="Enter Email Address" type="email" />
          <button type="submit" className="btn-primary px-6 py-2 rounded-full">Send</button>
        </form>
        <div className="mt-3 text-xs text-gray-500 flex items-center justify-center gap-6">
          <span>★ 4.9/5 Average Ratings</span>
          <span>🏆 25+ Winning Awards</span>
          <span>✅ Certified Product Designer</span>
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-brand text-white rounded-t-3xl p-3">
          <div className="marquee-container">
            <div className="marquee-track">
              <span>UX Design ✦ App Design ✦ Dashboard ✦ Wireframe ✦ User Research ✦</span>
              <span>UX Design ✦ App Design ✦ Dashboard ✦ Wireframe ✦ User Research ✦</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


