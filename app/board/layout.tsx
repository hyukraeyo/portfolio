import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <Header variant="top" />
      {children}
    </>
  );
}
