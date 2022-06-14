import { Doc } from 'contentlayer/generated';

import { PathSegment } from '../../types/PathSegment';
import { TreeNode } from '../../types/TreeNode';

export const buildDocsTree = (
  docs: Doc[],
  parentPathNames: string[] = [],
): TreeNode[] => {
  const level = parentPathNames.length;

  return docs
    .filter(
      (d) =>
        d.pathSegments.length === level + 1 &&
        d.pathSegments
          .map((pS: PathSegment) => pS.pathName)
          .join('/')
          .startsWith(parentPathNames.join('/')),
    )
    .sort((a, b) => a.pathSegments[level].order - b.pathSegments[level].order)
    .map<TreeNode>((d) => ({
      nav_title: d.nav_title ?? null,
      title: d.title,
      label: d.label ?? null,
      excerpt: d.excerpt ?? null,
      urlPath:
        '/docs/' +
        d.pathSegments.map((pS: PathSegment) => pS.pathName).join('/'),
      collapsible: d.collapsible ?? null,
      collapsed: d.collapsed ?? null,
      children: buildDocsTree(
        docs,
        d.pathSegments.map((pS: PathSegment) => pS.pathName),
      ),
    }));
};
