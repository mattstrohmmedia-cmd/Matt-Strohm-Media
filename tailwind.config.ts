import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        'bg-alt': '#0c0c0c',
        surface: '#141414',
        'surface-hover': '#1a1a1a',
        text: '#eae6df',
        'text-dim': '#8a857e',
        'text-muted': '#555049',
        accent: '#c9a84c',
        'accent-bright': '#e0c068',
        'accent-glow': 'rgba(201, 168, 76, 0.12)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-soft': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      maxWidth: {
        container: '1400px',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        lineReveal: {
          from: { transform: 'translateY(110%)' },
          to: { transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        lineReveal: 'lineReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        scrollPulse: 'scrollPulse 2s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
