'use client';

import { EXPERIENCE_DATA } from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useCallback, useEffect, useState, useRef } from 'react';
import FadeIn from './animations/FadeIn';
import styles from './Experience.module.scss';
import ExpandButton from './ui/ExpandButton';

// 애니메이션 variants
const popoverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -8,
    transition: {
      duration: 0.15,
      ease: 'easeOut' as const,
    },
  },
};

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const experienceRef = useRef<HTMLHeadingElement>(null);

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

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePopover, closePopover]);

  // Experience 전체 데이터 사용 (분리 로직 제거)
  const experiences = EXPERIENCE_DATA;

  // renderExperienceItem 함수는 그대로 유지
  const renderExperienceItem = (
    item: (typeof EXPERIENCE_DATA)[0],
    index: number
  ) => {
    // ... 기존 내부 로직 유지 (isExpanded, hasMoreProjects 등 변수 사용 주의)
    const isExpanded = expandedItems.includes(index);
    const hasMoreProjects = item.projects && item.projects.length > 2;
    const visibleProjects = item.projects?.slice(0, 2) || [];
    const hiddenProjects = hasMoreProjects ? item.projects!.slice(2) : [];

    return (
      <div className={styles.content}>
        <span className={styles.period}>{item.period}</span>
        <h3 className={styles.itemTitle}>{item.title}</h3>
        <p className={styles.subtitle}>
          {item.subtitle}
          {item.subtitle
            ? ` · ${calculateDuration(item.period)}`
            : calculateDuration(item.period)}
        </p>

        {/* 프로젝트 리스트 렌더링 */}
        {item.projects && (
          <div className={styles.projectList}>
            {visibleProjects?.map((project, pIndex) => {
              const popoverKey = `${index}-${pIndex}`;
              const isPopoverOpen = activePopover === popoverKey;

              return (
                <motion.div
                  key={pIndex}
                  className={styles.projectItem}
                  layout
                  style={{
                    zIndex: isPopoverOpen ? 200 : 1,
                    position: 'relative',
                  }}
                >
                  {/* ... 프로젝트 상세 렌더링 ... */}
                  <div className={styles.detailWrapper}>
                    <motion.button
                      className={`${styles.projectNameButton} ${
                        isPopoverOpen ? styles.active : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDescription(popoverKey);
                      }}
                      aria-expanded={isPopoverOpen}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {project.name}
                      {project.description && (
                        <motion.span
                          className={`${styles.hasDetailIndicator} ${
                            styles[`indicatorColor${(pIndex % 2) + 1}`]
                          }`}
                          animate={{ scale: isPopoverOpen ? 1.4 : 1 }}
                        />
                      )}
                    </motion.button>
                    <AnimatePresence mode="wait">
                      {project.description && isPopoverOpen && (
                        <motion.div
                          className={styles.descriptionPopover}
                          variants={popoverVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          <ul className={styles.projectDescription}>
                            {project.description.map((desc, dIndex) => (
                              <motion.li
                                key={dIndex}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: dIndex * 0.05 }}
                              >
                                {desc}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span className={styles.projectPeriod}>{project.period}</span>
                </motion.div>
              );
            })}

            {/* 숨겨진 프로젝트 (내부 더보기) */}
            <AnimatePresence initial={false}>
              {isExpanded && hiddenProjects.length > 0 && (
                <motion.div
                  key="hidden-projects-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={styles.hiddenProjectsContainer}
                >
                  {hiddenProjects.map((project, pIndex) => {
                    const actualIndex = 2 + pIndex;
                    const popoverKey = `${index}-${actualIndex}`;
                    const isPopoverOpen = activePopover === popoverKey;

                    return (
                      <motion.div
                        key={`hidden-${pIndex}`}
                        className={styles.projectItem}
                        style={{
                          zIndex: isPopoverOpen ? 200 : 1,
                          position: 'relative',
                        }}
                      >
                        <div className={styles.detailWrapper}>
                          <motion.button
                            className={`${styles.projectNameButton} ${
                              isPopoverOpen ? styles.active : ''
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDescription(popoverKey);
                            }}
                            aria-expanded={isPopoverOpen}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {project.name}
                            {project.description && (
                              <motion.span
                                className={`${styles.hasDetailIndicator} ${
                                  styles[
                                    `indicatorColor${(actualIndex % 2) + 1}`
                                  ]
                                }`}
                                animate={{ scale: isPopoverOpen ? 1.4 : 1 }}
                              />
                            )}
                          </motion.button>
                          <AnimatePresence mode="wait">
                            {project.description && isPopoverOpen && (
                              <motion.div
                                className={styles.descriptionPopover}
                                variants={popoverVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <ul className={styles.projectDescription}>
                                  {project.description.map((desc, dIndex) => (
                                    <li key={dIndex}>{desc}</li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <span className={styles.projectPeriod}>
                          {project.period}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 내부 프로젝트 더보기 버튼 (#8) */}
        {hasMoreProjects && (
          <ExpandButton
            isExpanded={isExpanded}
            onClick={() => toggleExpand(index)}
            collapsedLabel={`+${item.projects!.length - 2}`}
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
            className={styles.moreButton}
          />
        )}
      </div>
    );
  };

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        <div className={styles.experienceWrapper} id="experience-content">
          <FadeIn direction="up" delay={0.1} className={styles.header}>
            <span className={styles.subTitle}>WORK EXPERIENCE</span>
            {/* <h2 ref={experienceRef} className={styles.title}>
              경력
            </h2> */}
          </FadeIn>

          <FadeIn
            direction="up"
            delay={0.2}
            fullWidth
            className={styles.experienceFadeIn}
          >
            <div className={styles.experienceCard}>
              <LayoutGroup>
                {/* 
                  높이 제한 및 그라데이션 컨테이너 
                  - 접혔을 때: max-height 적용 + overflow hidden
                  - 펼쳐졌을 때: max-height 해제
                */}
                <motion.div
                  className={styles.listContainer}
                  initial={false}
                  animate={{
                    height: isExperienceExpanded ? 'auto' : 650, // 650px는 약 2.5개 높이
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
                  <div className={styles.list}>
                    {experiences.map((item, idx) => (
                      <motion.div key={idx} className={styles.item}>
                        <motion.div
                          className={styles.marker}
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3 + idx, // 시차를 둠
                          }}
                        >
                          ✦
                        </motion.div>
                        {renderExperienceItem(item, idx)}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 그라데이션 오버레이 및 더보기 버튼 (항상 렌더링하되 opacity로 제어) */}
                <motion.div
                  className={styles.fadeOverlay}
                  initial={{ opacity: 1 }}
                  animate={{
                    opacity: isExperienceExpanded ? 0 : 1,
                    pointerEvents: isExperienceExpanded ? 'none' : 'auto',
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <button
                    id="experience-expand-click-area"
                    className={styles.fullAreaButton}
                    style={{ position: 'relative', zIndex: 30 }}
                    onClick={() => setIsExperienceExpanded(true)}
                    aria-label="경력 전체 보기"
                    // 탭 포커스 방지 (펼쳐졌을 때)
                    tabIndex={isExperienceExpanded ? -1 : 0}
                  >
                    <div className={styles.buttonContent}>
                      <span className={styles.overlayIcon}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                        </svg>
                      </span>
                    </div>
                  </button>
                </motion.div>

                {/* 접기 버튼 (맨 아래, 펼쳐졌을 때만 표시) */}
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
