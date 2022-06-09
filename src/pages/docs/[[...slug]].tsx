import Head from 'next/head';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';

import { allDocs, Doc } from 'contentlayer/generated';
import { PathSegment } from 'types/PathSegment';
import { defineStaticProps, toParams } from 'src/utils/next';

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

export const getStaticProps = defineStaticProps(async (context: Context) => {
  const { params } = context;
  const pagePath = params?.slug?.join('/') ?? '';

  const doc = allDocs.find(
    (d) =>
      d.pathSegments.map((pS: PathSegment) => pS.pathName).join('/') ===
      pagePath,
  )!;

  return { props: { doc } };
});

const DocLayout = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { doc } = props;
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <div className="relative mx-auto w-full max-w-screen-2xl lg:flex lg:items-start">
        <article>
          <div>
            <h1 className="sr-only text-2xl font-semibold text-slate-800 dark:text-slate-200 md:text-3xl lg:not-sr-only lg:text-4xl">
              {doc.title}
            </h1>
          </div>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: doc.body.html }}
          />
        </article>
      </div>
    </>
  );
};

export default DocLayout;
