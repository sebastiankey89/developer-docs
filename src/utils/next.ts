import { GetStaticProps } from 'next';

export function toParams(path: string): { params: { slug: string[] } } {
  return { params: { slug: path.replace(/^\//, '').split('/') } };
}

// Needed in combination with `InferGetStaticPropsType`
export function defineStaticProps<Fn extends GetStaticProps>(fn: Fn): Fn {
  return fn;
}
