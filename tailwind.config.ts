import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '560px',
      md: '860px',
      lg: '1024px',
      xl: '1240px',
    },
    extend: {
      colors: {
        cream: { DEFAULT: '#FBF4E9', 2: '#F5E7D2', 3: '#EFD9BC' },
        ink: { DEFAULT: '#1E1A15', 2: '#2B251E', soft: '#4A4036' },
        tomato: { DEFAULT: '#E8552D', deep: '#C8401D' },
        gold: '#F4B33D',
        teal: '#1F9E86',
        berry: '#D14B7A',
        text: {
          DEFAULT: '#221E18',
          soft: '#6B6053',
          invert: '#F4EADB',
          'invert-soft': '#B8AC99',
        },
        line: { DEFAULT: '#E4D3B8', ink: '#3A332A' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '26px',
        xl: '40px',
        pill: '999px',
      },
      boxShadow: {
        sm: '0 2px 0 rgba(30,26,21,.10)',
        card: '0 18px 40px -22px rgba(30,26,21,.45)',
        pop: '6px 6px 0 #1E1A15',
      },
      maxWidth: {
        site: '1240px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
