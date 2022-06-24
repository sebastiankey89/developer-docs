import { FC } from 'react';
import Link from 'next/link';
import { Icon } from './Icon';

const isExternalUrl = (link: string): boolean => !link.startsWith('/');

export const ChevronLink: FC<{ label: string; url: string }> = ({
  label,
  url,
}) => {
  return (
    <Link href={url}>
      <a
        target={isExternalUrl(url) ? '_blank' : undefined}
        rel={isExternalUrl(url) ? 'noreferrer' : undefined}
        className="inline-flex items-center space-x-1.5 text-sky-600 no-underline hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
      >
        <span className="font-semibold">{label}</span>
        <span className="block w-2">
          <Icon name="chevron-right" />
        </span>
      </a>
    </Link>
  );
};
