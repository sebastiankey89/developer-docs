import { FC } from 'react';

import { MainNavigation } from './MainNavigation';

interface Props {
  children: React.ReactNode;
}

export const Container: FC<Props> = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative pt-16" style={{ scrollPaddingTop: '150px' }}>
          {children}
        </main>
      </div>
    </>
  );
};
