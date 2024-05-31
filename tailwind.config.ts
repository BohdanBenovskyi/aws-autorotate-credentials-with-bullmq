import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", './node_modules/flowbite-react/lib/esm/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
} satisfies Config;
