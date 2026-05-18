from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "src" / "pages" / "index.tsx"
text = p.read_text(encoding="utf-8")

old2 = """                  <div className="h-36 rounded-xl mb-5 bg-gradient-to-br from-cyan-500/10 via-[var(--xws-bg-raised)] to-emerald-500/10 border border-[var(--xws-border)] relative">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.4),transparent_55%)]" />
                    <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[var(--xws-text-muted)]">
                      AI deployment
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--xws-text-primary)] mb-2">{caseStudy.title}</h3>
                  <p className="text-sm text-[var(--xws-text-muted)] flex-1 leading-relaxed">{caseStudy.description}</p>
                  <p className="mt-4 text-sm font-semibold text-[var(--xws-accent)]">{caseStudy.impact}</p>"""

new = """                  <div className="relative h-44 sm:h-48 overflow-hidden border-b border-[var(--xws-border)]">
                    <Image
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--xws-bg-card)] via-[var(--xws-bg-card)]/20 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-widest text-[var(--xws-accent)] font-semibold">
                      AI deployment
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-[var(--xws-text-primary)] mb-2 group-hover:text-[var(--xws-accent)] transition-colors">{caseStudy.title}</h3>
                    <p className="text-sm text-[var(--xws-text-muted)] flex-1 leading-relaxed">{caseStudy.description}</p>
                    <p className="mt-4 text-sm font-semibold text-[var(--xws-accent)]">{caseStudy.impact}</p>
                  </div>"""

if old2 in text:
    text = text.replace(old2, new)
    print("ai cards ok")
else:
    print("ai cards block not found")

text2, n = re.subn(
    r"          \{/\* Tech stack strip \*/\}.*?</section>\s*\n\s*\{/\* Featured projects \*/\}",
    "          <TechStackStrip />\n\n          {/* Featured projects */}",
    text,
    count=1,
    flags=re.S,
)
if n:
    text = text2
    print("tech stack ok")

gh = """              <div className="mt-10">
                <div className="xws-card p-8 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-[var(--xws-text-primary)] mb-3">Open engineering</h3>
                  <p className="text-sm text-[var(--xws-text-muted)] mb-6">
                    Experiments, starters, and tooling we maintain for the community.
                  </p>
                  <GithubShowcase />
                </div>
              </div>"""
if gh in text:
    text = text.replace(gh, "              {/* GitHub showcase hidden */}")
    print("github ok")

p.write_text(text, encoding="utf-8")
print("written")
