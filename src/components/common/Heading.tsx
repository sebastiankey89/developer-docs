// Modified from: https://github.com/contentlayerdev/website/blob/main/src/components/common/Headings.tsx
import { FC } from 'react';
import { sluggifyTitle, getNodeText } from '../../utils/sluggify';

export const H2: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children));
  return (
    <h2
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className="group cursor-pointer"
    >
      <span className="absolute left-8 hidden text-slate-400 dark:text-slate-600 lg:group-hover:inline">
        #
      </span>
      {children}
    </h2>
  );
};

export const H3: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children));
  return (
    <h3
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className="group cursor-pointer"
    >
      <span className="absolute left-8 hidden text-slate-400 dark:text-slate-600 lg:group-hover:inline">
        #
      </span>
      {children}
    </h3>
  );
};

export const H4: FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const slug = sluggifyTitle(getNodeText(children));
  return (
    <h4
      id={slug}
      onClick={() => (window.location.hash = `#${slug}`)}
      className="group cursor-pointer"
    >
      <span className="absolute left-8 hidden text-slate-400 dark:text-slate-600 lg:group-hover:inline">
        #
      </span>
      {children}
    </h4>
  );
};
