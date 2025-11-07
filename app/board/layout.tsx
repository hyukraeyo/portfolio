import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ReactNode } from 'react';

export default function BoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

