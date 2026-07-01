module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./pages/**/*.md"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'on-accent': 'var(--color-on-accent)'
      }
    }
  },
  plugins: []
}
