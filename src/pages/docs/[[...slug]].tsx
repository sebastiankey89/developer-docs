import Head from 'next/head';
import { InferGetStaticPropsType, GetStaticPropsContext } from 'next';

import { allDocs } from 'contentlayer/generated';
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

  return { props: { doc } };
};

const DocLayout = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { doc } = props;
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <div>
        <article>
          <div>
            <h1 className="text-2xl font-semibold">{doc.title}</h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
        </article>
      </div>
    </>
  );
};

export default DocLayout;
