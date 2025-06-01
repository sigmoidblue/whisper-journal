/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spectral: ['Spectral', 'serif'],
        heading2: ['Libre Baskerville', 'serif'],
        heading3: ['EB Garamond', 'serif'],
        heading4: ['Cardo', 'serif'],
      },
      backgroundImage: {
        "main-grad": "linear-gradient(to top,  #71C7FF, #A8DFFF, #D6F0FF);",
        "main-grad-short":
        "linear-gradient(to top, rgba(254, 202, 202, 1) 0%, rgba(255, 234, 234, 1) 25%, rgba(255, 255, 255, 1) 100%)",
      },
    },
  },
  plugins: [],
}

