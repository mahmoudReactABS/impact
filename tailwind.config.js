const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html',
    flowbite.content(),
  ],
  
  plugins: [flowbite.plugin(),],
};
