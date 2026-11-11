import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://coruna.info',
  output: 'static',
  integrations: [react()],
});
