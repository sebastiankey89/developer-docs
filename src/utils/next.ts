import { GetStaticProps } from 'next';

export function toParams(path: string): { params: { slug: string[] } } {
  return { params: { slug: path.replace(/^\//, '').split('/') } };
}
