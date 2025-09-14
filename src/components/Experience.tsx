import { useEffect, useState } from "react";
import { Experience as Exp, fetchExperience } from "@/lib/api";
import { motion } from "framer-motion";
import { assetUrl } from "@/lib/url";
import Image from "next/image";
import { log } from "console";

const base = process.env.NEXT_PUBLIC_API_BASE


export default function Experience() {
  const [items, setItems] = useState<Exp[]>([]);
  useEffect(() => {
    fetchExperience()
      .then(setItems)
      .catch(() => setItems([]));
  }, []);
  return (
    <section className="container-responsive py-20" id="experience">
      <div className="text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold">
          My <span className="text-brand">Work Experience</span>
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Highlights from recent roles with impact and ownership.
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-brand via-purple-400 to-emerald-400 rounded-full opacity-40" />
        {items.map((r, idx) => (
          <motion.div
            key={r.company + r.title}
            className={`relative ${
              idx % 2 === 0 ? "md:pr-14" : "md:pl-14 md:col-start-2"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="absolute hidden md:block top-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-[6px] border-white dark:border-gray-900 bg-brand shadow" />
            <div className="card p-6 md:p-7">
              {/* Header: company + period */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}

                  {r?.logo ? (
                    <Image
                      src={assetUrl(r?.logo)}
                      alt={r.company}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-800 object-cover"
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?background=random&name=${encodeURIComponent(
                        r.company
                      )}`}
                      alt={r.company}
                      className="w-12 h-12 rounded-xl border border-gray-200 dark:border-gray-800 object-cover"
                    />
                  )}

                  <div className="min-w-0 text-left">
                    <h3 className="font-semibold text-lg leading-snug truncate">
                      {r.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {r.company}
                      {r.location ? `, ${r.location}` : ""}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-brand/10 text-brand border border-brand/20">
                    {r.period}
                  </span>
                </div>
              </div>
              {/* Divider */}
              <div className="mt-3 h-px bg-gray-200 dark:bg-gray-800" />
              {/* Bullets */}
              <ul className="mt-3 list-disc pl-5 text-sm space-y-1 text-left">
                {(r.bullets || []).map((b , i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              {/* Optional website */}
              {r.website && (
                <a
                  className="mt-3 inline-block text-sm text-brand hover:underline"
                  href={
                    r.website.startsWith("http")
                      ? r.website
                      : `https://${r.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit website ↗
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
