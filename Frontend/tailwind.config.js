/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7A00",
        "primary-hover": "#E86E00",
        secondary: "#2B2B2B",
        background: "#F8F8F8",
        surface: "#FFFFFF",
        "surface-elevated": "#FAFAFA",
        text: "#222222",
        "text-secondary": "#666666",
        "text-muted": "#999999",
        border: "#EAEAEA",
        "border-light": "#F0F0F0",
        error: "#EF4444",
        success: "#22C55E",
      },
      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "80px",
        "5xl": "120px",
      },
      borderRadius: {
        "card": "24px",
        "button": "14px",
        "input": "12px",
        "badge": "8px",
        "pill": "9999px",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        "display": ["56px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["40px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading": ["28px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-sm": ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["13px", { lineHeight: "1.5", fontWeight: "400" }],
        "label": ["13px", { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "600" }],
        "caption": ["11px", { lineHeight: "1.4", fontWeight: "500" }],
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 6px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.06), 0 12px 28px rgba(0,0,0,0.08)",
        "elevated": "0 8px 32px rgba(0,0,0,0.08)",
        "drawer": "-8px 0 32px rgba(0,0,0,0.12)",
        "modal": "0 24px 64px rgba(0,0,0,0.16)",
        "fab": "0 4px 16px rgba(255,122,0,0.3)",
        "fab-hover": "0 8px 24px rgba(255,122,0,0.4)",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'slow-zoom': 'slow-zoom 25s ease-out infinite alternate',
      },
    },
  },
  plugins: [],
}
