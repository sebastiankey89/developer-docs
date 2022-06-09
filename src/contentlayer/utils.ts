import type { DocumentGen } from 'contentlayer/core';

export const contentDirPath = 'content';

export const urlFromFilePath = (doc: DocumentGen): string => {
  return doc._raw.flattenedPath.replace(/pages\/?/, '');
};

export const pathSegmentsFromFilePath = (doc: DocumentGen) => {
  return (
    doc._raw.flattenedPath
      .split('/')
      // skip `/docs` prefix
      .slice(1)
      .map((dirName: string) => {
        const re = /^((\d+)-)?(.*)$/;
        const [, , orderStr, pathName] = dirName.match(re) ?? [];
        const order = orderStr ? parseInt(orderStr) : 0;
        return { order, pathName };
      })
  );
};
