// Modified from: https://github.com/contentlayerdev/website/blob/main/src/contentlayer/document/Doc.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import highlight from 'rehype-highlight';

import {
  urlFromFilePath,
  contentDirPath,
  pathSegmentsFromFilePath,
  headingsFromRawMdx,
  getLastEditedDate,
} from '../utils';

export type DocHeading = { level: 1 | 2 | 3; title: string };

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the page',
      required: true,
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav',
    },
    label: {
      type: 'string',
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    show_child_cards: {
      type: 'boolean',
      default: false,
    },
    collapsible: {
      type: 'boolean',
      required: false,
      default: false,
    },
    collapsed: {
      type: 'boolean',
      required: false,
      default: false,
    },
  },
  computedFields: {
    url_path: {
      type: 'string',
      resolve: urlFromFilePath,
    },
    pathSegments: {
      type: 'json',
      resolve: pathSegmentsFromFilePath,
    },
    headings: {
      type: 'json',
      resolve: headingsFromRawMdx,
    },
    last_edited: { type: 'date', resolve: getLastEditedDate },
  },
}));

export default makeSource({
  contentDirPath,
  documentTypes: [Doc],
  mdx: { rehypePlugins: [highlight] },
});
