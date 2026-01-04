/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      colors: {
        background: "#030014", // Deep rich dark background
        primary: {
          DEFAULT: "#6366f1", // Indigo 500
          foreground: "#ffffff",
          hover: "#4f46e5", // Indigo 600
        },
        secondary: {
          DEFAULT: "#818cf8", // Indigo 400
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#c084fc", // Purple 400
          glow: "rgba(192, 132, 252, 0.5)",
        },
        surface: {
          50: "rgba(255, 255, 255, 0.05)",
          100: "rgba(255, 255, 255, 0.1)",
          200: "rgba(255, 255, 255, 0.2)",
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px -10px rgba(99, 102, 241, 0.5)' },
          '100%': { boxShadow: '0 0 30px 0px rgba(192, 132, 252, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
