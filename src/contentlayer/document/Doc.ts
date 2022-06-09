import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import highlight from 'rehype-highlight';

import {
  urlFromFilePath,
  contentDirPath,
  pathSegmentsFromFilePath,
} from '../../contentlayer/utils';

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the doc',
      required: true,
    },
    nav_title: {
      type: 'string',
      description: 'Override the title for display in nav',
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
  },
}));

export default makeSource({
  contentDirPath,
  documentTypes: [Doc],
  mdx: { rehypePlugins: [highlight] },
});
