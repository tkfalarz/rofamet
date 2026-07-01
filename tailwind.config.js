export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./pages/**/*.md"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'on-accent': 'var(--color-on-accent)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)'
      }
    }
  },
  plugins: []
}
