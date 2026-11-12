/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-muted)',
            '--tw-prose-headings': 'var(--color-ink)',
            '--tw-prose-links': 'var(--color-ink)',
            '--tw-prose-bold': 'var(--color-ink)',
            '--tw-prose-counters': 'var(--color-muted)',
            '--tw-prose-bullets': 'var(--color-line)',
            '--tw-prose-hr': 'var(--color-line)',
            '--tw-prose-quotes': 'var(--color-ink)',
            '--tw-prose-quote-borders': 'var(--color-line)',
            '--tw-prose-captions': 'var(--color-muted)',
            '--tw-prose-code': 'var(--color-ink)',
            lineHeight: 'var(--leading-copy)',
            h1: { fontSize: 'var(--text-h1)', fontWeight: '400', letterSpacing: 'var(--tracking-heading)' },
            h2: { fontSize: 'var(--text-h2)', fontWeight: '500' },
            h3: { fontSize: 'var(--text-h3)', fontWeight: '500' },
            a: {
              fontWeight: '400',
              textDecorationColor: 'var(--color-line)',
              textUnderlineOffset: '4px',
              '&:hover': { color: 'var(--color-sea)', textDecorationColor: 'var(--color-sea)' },
              '&:focus-visible': { outline: '2px solid var(--color-sea)', outlineOffset: '4px' },
            },
          },
        },
      },
    },
  },
};
