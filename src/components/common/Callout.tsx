import { FC, ReactNode } from 'react';
import { Icon } from './Icon';

interface CalloutProps {
  children: ReactNode;
  className?: string | '';
}

export const Callout: React.FC<CalloutProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg border border-sky-100 bg-sky-50 dark:border-sky-900/50 dark:bg-sky-900/20 ${className}`}
    >
      <div className="flex space-x-4 p-6 py-4 text-sky-600 dark:text-sky-300">
        <div className="mt-1 w-5 shrink-0 text-sky-500 dark:text-sky-400">
          <Icon name="exclamation" />
        </div>
        <div className="prose-a:font-semibold">{children}</div>
      </div>
    </div>
  );
};
