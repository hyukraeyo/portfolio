import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import ResumeGrid from '@/components/ResumeGrid';
import Interests from '@/components/Interests';
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Hero />
        <Intro />
        <ResumeGrid />
        <Interests />
      </main>
    </>
  );
}
