const fs = require('fs');
const path = require('path');

const outputTxtPath = path.join('C:\\Users\\91911\\.gemini\\antigravity-ide\\brain\\85f345e6-74f6-4b0b-8917-c1aa181c0455\\.system_generated\\steps\\302\\output.txt');
const data = JSON.parse(fs.readFileSync(outputTxtPath, 'utf8'));

const project = data.projects.find(p => p.name.includes('14478310782114536836'));

const colors = project.designTheme.namedColors;
const spacing = project.designTheme.spacing;
const typography = project.designTheme.typography;

const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(colors, null, 6).replace(/}$/, '      }')},
      spacing: ${JSON.stringify(spacing, null, 6).replace(/}$/, '      }')},
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(2rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        }
      },
      animation: {
        'fade-up': 'fade-up 1s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'scroll-line': 'scroll-line 2s infinite',
      }
    },
  },
  plugins: [],
}
`;

fs.writeFileSync('tailwind.config.js', tailwindConfig);
console.log('Successfully generated tailwind.config.js');
