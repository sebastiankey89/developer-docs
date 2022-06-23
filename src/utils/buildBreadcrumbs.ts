// modified from: https://github.com/contentlayerdev/website/blob/main/src/pages/docs/%5B%5B...slug%5D%5D.tsx
import { Doc } from 'contentlayer/generated';

import { PathSegment } from '../../types/PathSegment';

export interface Breadcrumb {
  path: string;
  slug: string;
  title: string;
}

export const buildBreadcrumbs = (allDocs: Doc[], slug?: string[]) => {
  let slugs = slug ? [...slug] : [];
  let path = '';

  const breadcrumbs = slugs.map((slug) => {
    path += path == '' ? slug : '/' + slug;
    const navTitle = allDocs.find(
      (d) =>
        d.pathSegments.map((pS: PathSegment) => pS.pathName).join('/') === path,
    )?.nav_title;
    const title = allDocs.find(
      (d) =>
        d.pathSegments.map((pS: PathSegment) => pS.pathName).join('/') === path,
    )?.title;
    return {
      path: '/docs/' + path,
      slug,
      title: (navTitle || title) as string,
    };
  });

  return breadcrumbs;
};
