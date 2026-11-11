import { createCn } from 'cn/config';

// Keep project font-size tokens distinct from text-color utilities when merging.
// FIXME: Fix this chamba
export const cn = createCn({
  extend: {
    classGroups: {
      'font-size': [{ text: ['3xs', '2xs', 'caption', 'meta', 'label', 'md', 'reading', 'h1', 'h2', 'h3', 'type-hero', 'quote', 'hero-tablet'] }],
    },
  },
});
