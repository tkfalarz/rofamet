# Color tokens (Machine and CSS)

Define a single source of truth for colors used across the site.

Tokens (exact names and hex):
- `--color-primary`: #F4F6F8
- `--color-secondary`: #4B5563
- `--color-accent`: #FF6B35
- `--color-on-accent`: #FFFFFF
- `--color-text`: #0F1724
- `--color-muted`: #9CA3AF
- `--color-surface`: #FFFFFF
- `--color-border`: #D1D5DB

Files to provide:
- `/styles/tokens.css` — :root variables and `--color-accent-rgb`, `--color-secondary-rgb` for opacity utilities.
- `/tokens.json` — JSON mapping token→hex and token→rgb.

Rules:
- No dark mode. Use tokens everywhere; do not create duplicate visual aliases.
- CTAs: background `--color-accent`, text `--color-on-accent`; on hover use a slightly darker accent (compute via `--color-accent-rgb` with opacity overlay or darker hex).

Accessibility verification (must be automated):
- Confirm contrast(`--color-text`, `--color-primary`) >= 4.5:1.
- Confirm contrast(`--color-on-accent`, `--color-accent`) >= 4.5:1 for normal text; if not, darken `--color-accent`.

Actionable steps for implementer:
1. Commit `/styles/tokens.css` and `/tokens.json` with exact tokens above.
2. Add tests or a small script to compute and assert contrast ratios.
3. (Optional) Map tokens into `tailwind.config.js` when integrating Tailwind.
