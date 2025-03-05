import type { Config } from 'tailwindcss';


const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom Classes
        'primary-green': '#166534',
        'secondary-green': '#14532D',
        'tertiary-green': '#F0FDF4',
        'pricing-green': '#DCFCE7',
        'black': '#000000',
      }

    },
  },
  plugins: [],
};

export default config;
