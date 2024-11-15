import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  },

  plugins: [forms, aspectRatio]
} satisfies Config;
