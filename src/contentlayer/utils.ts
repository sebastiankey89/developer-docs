// Modified from: https://github.com/contentlayerdev/website/blob/main/src/contentlayer/utils.ts
import { DocumentGen } from 'contentlayer/core';
import type * as unified from 'unified';
import { bundleMDX } from 'mdx-bundler';
import { mdxToMarkdown } from 'mdast-util-mdx';
import { toMarkdown } from 'mdast-util-to-markdown';
import * as fs from 'node:fs/promises';
import path from 'node:path';

import { DocHeading } from './document/Doc';

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

export const headingsFromRawMdx = async (doc: DocumentGen) => {
  const headings: DocHeading[] = [];

  await bundleMDX({
    source: doc.body.raw,
    mdxOptions: (opts) => {
      opts.remarkPlugins = [...(opts.remarkPlugins ?? []), tocPlugin(headings)];
      return opts;
    },
  });

  return [{ level: 1, title: doc.title }, ...headings];
};

export const getLastEditedDate = async (doc: DocumentGen): Promise<Date> => {
  const stats = await fs.stat(
    path.join(contentDirPath, doc._raw.sourceFilePath),
  );
  return stats.mtime;
};

const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return (node: any) => {
      for (const element of node.children.filter(
        (c: any) => c.type === 'heading' || c.name === 'OptionsTable',
      )) {
        if (element.type === 'heading') {
          const title = toMarkdown(
            { type: 'paragraph', children: element.children },
            { extensions: [mdxToMarkdown()] },
          )
            .trim()
            .replace(/<.*$/g, '')
            .replace(/\\/g, '')
            .trim();
          headings.push({ level: element.depth, title });
        } else if (element.name === 'OptionsTable') {
          element.children
            .filter((c: any) => c.name === 'OptionTitle')
            .forEach((optionTitle: any) => {
              optionTitle.children
                .filter((c: any) => c.type === 'heading')
                .forEach((heading: any) => {
                  const title = toMarkdown(
                    { type: 'paragraph', children: heading.children },
                    { extensions: [mdxToMarkdown()] },
                  )
                    .trim()
                    .replace(/<.*$/g, '')
                    .replace(/\\/g, '')
                    .trim();
                  headings.push({ level: heading.depth, title });
                });
            });
        }
      }
    };
  };
