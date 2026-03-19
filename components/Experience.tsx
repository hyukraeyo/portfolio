'use client';

import { EXPERIENCE_DATA } from '@/lib/data/resume';
import { LayoutGroup, m } from 'framer-motion';
import { useCallback, useEffect, useState, useRef } from 'react';
import FadeIn from './animations/FadeIn';
import styles from './Experience.module.scss';
import ExpandButton from './ui/ExpandButton';
import ExperienceItem from './Experience/ExperienceItem';
import ProjectPopover from './Experience/ProjectPopover';
import { getStringHash } from './Experience/utils';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'career' | 'projects'>('career');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [colorOffset, setColorOffset] = useState(0);
  const experienceRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // 페이지 마운트 시 큰 숫자의 랜덤 시드 설정 (새로고침마다 패턴 자체가 바뀌도록 함)
    setColorOffset(Math.floor(Math.random() * 1000000));
  }, []);

  // 모든 프로젝트 평탄화 (프로젝트 탭용)
  const allProjects = EXPERIENCE_DATA.flatMap((exp, expIdx) =>
    exp.projects?.map((proj, projIdx) => ({
      ...proj,
      popoverKey: `all-${expIdx}-${projIdx}`,
    })) || []
  );

  // 메모이제이션된 이벤트 핸들러들
  const toggleExpand = useCallback((index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const toggleDescription = useCallback((projectKey: string) => {
    setActivePopover((prev) => (prev === projectKey ? null : projectKey));
  }, []);

  const closePopover = useCallback(() => {
    setActivePopover(null);
  }, []);

  // 외부 클릭 및 스크롤 시 팝오버 닫기
  useEffect(() => {
    if (!activePopover) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.projectItem}`)) {
        closePopover();
      }
    };

    const handleScroll = () => {
      closePopover();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopover();
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePopover, closePopover]);

  const experiences = EXPERIENCE_DATA;

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        <div className={styles.experienceWrapper} id="experience-content">
          <FadeIn direction="up" delay={0.1} className={styles.header}>
            <h2 ref={experienceRef} className={styles.subTitle}>
              WORK EXPERIENCE
            </h2>
          </FadeIn>

          {/* 탭 전환 버튼 */}
          <FadeIn direction="up" delay={0.15} className={styles.tabContainer}>
            <div className={styles.tabWrapper}>
              <m.div
                className={styles.activeTabBackground}
                initial={false}
                animate={{
                  x: activeTab === 'career' ? 0 : '100%',
                  width: 'calc(50% - 4px)', // $spacing-1 (4px) 만큼 제외한 너비
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <button
                className={`${styles.tab} ${
                  activeTab === 'career' ? styles.active : ''
                }`}
                onClick={() => setActiveTab('career')}
              >
                경력
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === 'projects' ? styles.active : ''
                }`}
                onClick={() => setActiveTab('projects')}
              >
                프로젝트
              </button>
            </div>
          </FadeIn>

          <FadeIn
            direction="up"
            delay={0.2}
            fullWidth
            className={styles.experienceFadeIn}
          >
            <div className={styles.experienceCard}>
              <LayoutGroup>
                <m.div
                  className={`${styles.listContainer} ${
                    activePopover ? styles.hasActivePopover : ''
                  }`}
                  initial={false}
                  animate={{
                    height: isExperienceExpanded ? 'auto' : 650,
                  }}
                  transition={{
                    height: {
                      type: 'spring',
                      stiffness: 60,
                      damping: 15,
                      mass: 1,
                    },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <m.div
                    key={activeTab}
                    className={styles.list}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {activeTab === 'career' ? (
                      experiences.map((item, idx) => {
                        const hasActivePopoverInItem =
                          activePopover && activePopover.startsWith(`${idx}-`);

                        return (
                          <m.div
                            key={`career-${idx}`}
                            className={`${styles.item} ${
                              hasActivePopoverInItem ? styles.activeItem : ''
                            }`}
                          >
                            <m.div
                              className={styles.marker}
                              style={{
                                color: [
                                  'var(--color-brand-blue)',
                                  'var(--color-brand-green)',
                                  'var(--color-accent)',
                                ][getStringHash(item.title, colorOffset) % 3],
                              }}
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3 + idx,
                              }}
                            >
                              ✦
                            </m.div>
                            <ExperienceItem
                              item={item}
                            />
                          </m.div>
                        );
                      })
                    ) : (
                      <div className={`${styles.projectList} ${styles.unified}`}>
                        {allProjects.map((project, idx) => (
                          <ProjectPopover
                            key={`proj-${idx}`}
                            project={project}
                            popoverKey={project.popoverKey}
                            isPopoverOpen={activePopover === project.popoverKey}
                            colorOffset={colorOffset}
                            onToggle={toggleDescription}
                          />
                        ))}
                      </div>
                    )}
                  </m.div>
                </m.div>

                {/* 그라데이션 오버레이 및 더보기 버튼 */}
                <m.div
                  className={styles.fadeOverlay}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: isExperienceExpanded ? 0 : 1,
                    pointerEvents: isExperienceExpanded ? 'none' : 'auto',
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <div className={styles.expandButtonWrapper}>
                    <ExpandButton
                      isExpanded={false}
                      onClick={() => setIsExperienceExpanded(true)}
                      collapsedLabel={
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      expandedLabel=""
                      showIcon={false}
                      className={styles.expandSectionButton}
                    />
                  </div>
                </m.div>

                {/* 접기 버튼 */}
                {isExperienceExpanded && (
                  <div className={styles.collapseButtonWrapper}>
                    <ExpandButton
                      isExpanded={true}
                      onClick={() => {
                        experienceRef.current?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                        setIsExperienceExpanded(false);
                      }}
                      collapsedLabel=""
                      expandedLabel={
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18 15L12 9L6 15"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                      showIcon={false}
                      className={styles.expandSectionButton}
                    />
                  </div>
                )}
              </LayoutGroup>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
