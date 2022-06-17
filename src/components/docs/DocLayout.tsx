import { FC } from 'react';

import { MainNavigation } from '../common/MainNavigation';
import { Footer } from '../common/Footer';

interface DocLayoutProps {
  children: React.ReactNode;
}

export const DocLayout: FC<DocLayoutProps> = ({ children }) => {
  return (
    <>
      <MainNavigation />
      <div className="flex min-h-screen flex-col justify-between">
        <main className="relative pt-16" style={{ scrollPaddingTop: '150px' }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
