from pathlib import Path

p = Path(__file__).resolve().parents[1] / "src" / "pages" / "ai.tsx"
text = p.read_text(encoding="utf-8")

text = text.replace(
    '                      <motion.div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-accent)]">',
    '                      <motion.div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-accent)]">',
)
# fix mismatched tag: motion.div open -> div
text = text.replace(
    '                      <motion.div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-accent)]">',
    '                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-[var(--xws-accent-dim)] border border-[var(--xws-border)] flex items-center justify-center text-[var(--xws-accent)]">',
    1,
)

text = text.replace(
    '                <motion.div className="space-y-2">',
    '                <div className="space-y-2">',
    1,
)
text = text.replace(
    """                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />""",
    """                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />""",
)
# fix stack closing: after Preferred stack block, change outer motion.div close to div
old_stack_close = """                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          <section className="container-responsive py-16">"""
new_stack_close = """                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">"""
# Wrong - let me find correct pattern
old_stack_close = """                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />"""
new_stack_close = """                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />"""

if old_stack_close in text:
    text = text.replace(old_stack_close, new_stack_close.replace("motion.div", "div").replace("div", "div", 1))
    # simpler replacement
    text = text.replace(
        """                  ))}
                </motion.div>
              </div>
            </div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />""",
        """                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />""",
    )
    text = text.replace("                </motion.div>\n              </motion.div>", "                </motion.div>\n              </motion.div>", 1)
    text = text.replace(
        """                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />""",
        """                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section className="container-responsive py-16">
            <AutomationShowcase />""",
    )

# Clean fix for stack section only
text = p.read_text(encoding="utf-8") if False else text
p.write_text(text, encoding="utf-8")
print("done")
