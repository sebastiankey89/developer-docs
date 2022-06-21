// Modified from: https://github.com/contentlayerdev/website/blob/main/src/utils/build-docs-tree.ts
import { Doc } from 'contentlayer/generated';

import { PathSegment } from '../../types/PathSegment';

export interface Breadcrumb {
  path: string;
  slug: string;
  title: string;
}

export const buildBreadcrumbs = (allDocs: Doc[], slug?: string[]) => {
  let slugs = slug ? ['', ...slug] : [];
  let path = '';
  let breadcrumbs: Breadcrumb[] = [];
  for (const slug of slugs) {
    path += path == '' ? slug : '/' + slug;
    const navTitle = allDocs.find(
      (d) =>
        d.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.nav_title;
    const title = allDocs.find(
      (d) =>
        d.pathSegments.map((_: PathSegment) => _.pathName).join('/') === path,
    )?.title;
    breadcrumbs.push({
      path: '/docs/' + path,
      slug,
      title: (navTitle || title) as string,
    });
  }
  return breadcrumbs;
};
