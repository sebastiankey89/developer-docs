import React from 'react';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';

import { allDocs } from 'contentlayer/generated';
import { DocsHeader } from 'src/components/docs/DocsHeader';
import { buildDocsTree } from 'src/utils/buildDocsTree';
import { DocsNavigation } from 'src/components/docs/DocsNavigation';
import { DocLayout } from 'src/components/common/DocLayout';
import { PathSegment } from 'types/PathSegment';
import { toParams } from 'src/utils/next';

type Context = GetStaticPropsContext<{
  slug?: string[];
}>;

export async function getStaticPaths() {
  const paths = allDocs
    .map((d) => d.pathSegments.map((pS: PathSegment) => pS.pathName).join('/'))
    .map(toParams);

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async (ctx: Context) => {
  const { params } = ctx;
  const pagePath = params?.slug?.join('/') ?? '';

  const doc = allDocs.find(
    (d) =>
      d.pathSegments.map((pS: PathSegment) => pS.pathName).join('/') ===
      pagePath,
  )!;
  const tree = buildDocsTree(allDocs);

  return { props: { doc, tree } };
};

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { doc, tree } = props;
  useLiveReload();
  const MDXContent = useMDXComponent(doc.body.code || '');

  return (
    <DocLayout>
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <div
          style={{ height: 'calc(100vh - 64px)' }}
          className="sticky top-16 hidden shrink-0 border-r border-gray-200 dark:border-gray-800 lg:block"
        >
          <div className="-ml-3 h-full overflow-y-scroll p-8 pl-16">
            <DocsNavigation tree={tree} />
          </div>
          <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-t from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
          <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-b from-white/0 to-white/100 dark:from-gray-950/0 dark:to-gray-950/100" />
        </div>

        <div className="relative w-full grow">
          <DocsHeader title={doc.title} tree={tree} />
          <div className="docs prose prose-slate prose-violet mx-auto mb-4 w-full max-w-3xl shrink p-4 pb-8 prose-headings:font-semibold prose-a:font-normal prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-hr:border-gray-200 dark:prose-invert dark:prose-a:text-violet-400 dark:prose-hr:border-gray-800 md:mb-8 md:px-8 lg:mx-0 lg:max-w-full lg:px-16">
            {MDXContent && <MDXContent />}
          </div>
        </div>
      </div>
    </DocLayout>
  );
};

export default Page;
