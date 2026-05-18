from pathlib import Path

p = Path("src/pages/index.tsx")
text = p.read_text(encoding="utf-8")

old = """          <section className="relative min-h-[min(92vh,900px)] flex flex-col justify-center pt-20 pb-20 sm:pt-28 sm:pb-28">
            <div className="absolute inset-0 bg-xws-radial-green pointer-events-none" />
            <motion.div className="absolute inset-0 bg-xws-radial-blue pointer-events-none" />
            <div className="xws-hero-rings" aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>

"""

new = """          <section className="relative min-h-[min(92vh,900px)] flex flex-col justify-center pt-20 pb-20 sm:pt-28 sm:pb-28 font-body">
            <HeroBackground />

"""

old = old.replace("motion.div", "div")

if old not in text:
    print("block not found")
    idx = text.find("xws-hero-rings")
    print(repr(text[idx - 150 : idx + 100]))
else:
    text = text.replace(old, new, 1)
    text = text.replace(
        'bg-[var(--xws-bg-card)] px-4 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[var(--xws-text-muted)] mb-8 sm:mb-10"',
        'bg-[var(--xws-bg-card)]/80 backdrop-blur-sm px-4 py-2.5 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[var(--xws-text-muted)] mb-8 sm:mb-10 font-body"',
        1,
    )
    p.write_text(text, encoding="utf-8")
    print("patched ok")
