import type { ComponentType } from 'react';
import type { TocItem } from '~/common/mdx/TocSection';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const documents = import.meta.glob<boolean, string, { default: ComponentType<any> }>('./content/**/*.mdx');

export const headings = import.meta.glob<boolean, string, TocItem[]>('./content/**/*.mdx', {
  import: 'MDXHeadings',
});
