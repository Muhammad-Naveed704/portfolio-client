import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-primary)',
          dark: '#047857',
        },
        surface: 'var(--color-surface)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)',
        xws: {
          canvas: 'var(--xws-bg-canvas)',
          raised: 'var(--xws-bg-raised)',
          card: 'var(--xws-bg-card)',
          glass: 'var(--xws-bg-glass)',
          accent: 'var(--xws-accent)',
          'accent-hover': 'var(--xws-accent-hover)',
          blue: 'var(--xws-blue)',
          border: 'var(--xws-border)',
          muted: 'var(--xws-text-muted)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'xws-glow': 'var(--xws-shadow-glow)',
        'xws-glow-blue': 'var(--xws-shadow-glow-blue)',
      },
      backgroundImage: {
        'xws-radial-green':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(52,211,153,0.15), transparent)',
        'xws-radial-blue':
          'radial-gradient(ellipse 60% 40% at 0% 50%, rgba(34,211,238,0.08), transparent)',
      },
      keyframes: {
        'xws-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'xws-float': 'xws-float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
