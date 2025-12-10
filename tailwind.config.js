/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blood-red': '#8a0000',
        'blood-dark': '#5c0000',
        'neon-purple': '#9d4edd',
        'cryptic-purple': '#7b2cbf',
      },
      fontFamily: {
        horror: ['var(--font-creepster)', 'cursive'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fog-drift': 'fog-drift 20s infinite linear',
        'flicker': 'flicker 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(138, 0, 0, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(138, 0, 0, 0.8), 0 0 60px rgba(157, 78, 221, 0.4)' },
        },
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: 1 },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: 0.4 },
        },
      },
      backgroundImage: {
        'horror-gradient': 'linear-gradient(180deg, #000 0%, #1a0000 50%, #000 100%)',
        'blood-gradient': 'radial-gradient(ellipse at center, rgba(138,0,0,0.3) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
