import highlight from 'rehype-highlight';
import { makeSource } from 'contentlayer/source-files';

import { contentDirPath } from './src/contentlayer/utils';
import * as documentTypes from './src/contentlayer';

export default makeSource({
  contentDirPath,
  documentTypes,
  mdx: { rehypePlugins: [highlight] },
});
