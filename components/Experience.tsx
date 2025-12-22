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
  }, [activePopover]);

  // 초기 표시 개수 설정
  const INITIAL_VISIBLE_COUNT = 3;

  // 항상 표시할 경력들
  const visibleExperiences = EXPERIENCE_DATA.slice(0, INITIAL_VISIBLE_COUNT);
  // 펼쳤을 때 추가로 표시할 경력들
  const hiddenExperiences = EXPERIENCE_DATA.slice(INITIAL_VISIBLE_COUNT);

  const renderExperienceItem = (
    item: (typeof EXPERIENCE_DATA)[0],
    index: number
  ) => {
    const isExpanded = expandedItems.includes(index);
    const hasMoreProjects = item.projects && item.projects.length > 2;
    // 항상 처음 2개만 visibleProjects
    const visibleProjects = item.projects?.slice(0, 2) || [];
    // 나머지는 hiddenProjects (펼쳐질 때 보여짐)
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
        {item.projects && (
          <div className={styles.projectList}>
            {/* 항상 보이는 프로젝트들 */}
            {visibleProjects?.map((project, pIndex) => {
              const popoverKey = `${index}-${pIndex}`;
              const isPopoverOpen = activePopover === popoverKey;

              return (
                <motion.div
                  key={pIndex}
                  className={styles.projectItem}
                  layout
                  transition={{
                    layout: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
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
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      {project.name}
                      {project.description && (
                        <motion.span
                          className={`${styles.hasDetailIndicator} ${
                            styles[`indicatorColor${(pIndex % 2) + 1}`]
                          }`}
                          animate={{
                            scale: isPopoverOpen ? 1.4 : 1,
                          }}
                          transition={{ type: 'spring', stiffness: 300 }}
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

            {/* 펼쳐졌을 때 추가로 보이는 프로젝트들 */}
            <AnimatePresence initial={false}>
              {isExpanded && hiddenProjects.length > 0 && (
                <motion.div
                  key="hidden-projects-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      height: {
                        type: 'tween',
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                      opacity: {
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        type: 'tween',
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                      opacity: {
                        duration: 0.5,
                        ease: 'easeInOut',
                      },
                    },
                  }}
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: pIndex * 0.05,
                            duration: 0.3,
                            ease: [0.23, 1, 0.32, 1],
                          },
                        }}
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
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25,
                            }}
                          >
                            {project.name}
                            {project.description && (
                              <motion.span
                                className={`${styles.hasDetailIndicator} ${
                                  styles[
                                    `indicatorColor${(actualIndex % 2) + 1}`
                                  ]
                                }`}
                                animate={{
                                  scale: isPopoverOpen ? 1.4 : 1,
                                }}
                                transition={{ type: 'spring', stiffness: 300 }}
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

        {/* 더보기/접기 버튼 - projectList 외부에 배치 */}
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
            className={styles.moreButton} // 위치 지정을 위해 클래스 유지 (내부 스타일은 제거 예정)
          />
        )}
      </div>
    );
  };

  return (
    <section className={styles.section} id="experience">
      <div className={styles.container}>
        {/* Experience Section */}
        <div className={styles.experienceWrapper} id="experience-content">
          <FadeIn direction="up" delay={0.1} className={styles.header}>
            <span className={styles.subTitle}>WORK EXPERIENCE</span>
            <h2 ref={experienceRef} className={styles.title}>
              경력
            </h2>
          </FadeIn>
          <FadeIn
            direction="up"
            delay={0.2}
            fullWidth
            className={styles.experienceFadeIn}
          >
            <div className={styles.experienceCard}>
              <LayoutGroup>
                <div className={styles.list}>
                  {/* 기본 표시 경력들 (최대 3개) */}
                  {visibleExperiences.map((item, idx) => (
                    <motion.div key={idx} className={styles.item}>
                      <motion.div
                        className={styles.marker}
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 3,
                          delay: idx * 0.5, // 마커 애니메이션 시차
                        }}
                      >
                        ✦
                      </motion.div>
                      {renderExperienceItem(item, idx)}
                    </motion.div>
                  ))}

                  {/* 나머지 경력 (펼쳤을 때만 표시) */}
                  <AnimatePresence initial={false}>
                    {isExperienceExpanded && hiddenExperiences.length > 0 && (
                      <motion.div
                        key="hidden-experiences-container"
                        className={styles.expandedContent}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: {
                            height: {
                              type: 'tween',
                              duration: 0.5,
                              ease: 'easeInOut',
                            },
                            opacity: {
                              duration: 0.5,
                              ease: 'easeInOut',
                            },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: {
                              type: 'tween',
                              duration: 0.5,
                              ease: 'easeInOut',
                            },
                            opacity: {
                              duration: 0.5,
                              ease: 'easeInOut',
                            },
                          },
                        }}
                      >
                        {hiddenExperiences.map((item, idx) => {
                          const actualIndex = INITIAL_VISIBLE_COUNT + idx;
                          return (
                            <motion.div
                              key={actualIndex}
                              className={styles.item}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                  delay: idx * 0.08,
                                  duration: 0.3,
                                  ease: [0.23, 1, 0.32, 1],
                                },
                              }}
                            >
                              <motion.div
                                className={styles.marker}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  type: 'spring',
                                  stiffness: 300,
                                  damping: 20,
                                  delay: idx * 0.08,
                                }}
                              >
                                ✦
                              </motion.div>
                              {renderExperienceItem(item, actualIndex)}
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </LayoutGroup>

              {/* 경력 더보기/접기 버튼 */}
              {hiddenExperiences.length > 0 && (
                <div className={styles.expandSectionWrapper}>
                  <ExpandButton
                    isExpanded={isExperienceExpanded}
                    onClick={() => {
                      // 접을 때만 스크롤 이동
                      if (isExperienceExpanded) {
                        experienceRef.current?.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                      setIsExperienceExpanded(!isExperienceExpanded);
                    }}
                    collapsedLabel=""
                    // expandedLabel은 아이콘으로 처리됨 (아래 svg)
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
                    showIcon={!isExperienceExpanded}
                    pulse={!isExperienceExpanded} // 초기 상태에서 펄스 효과
                    className={`${styles.expandSectionButton} ${
                      isExperienceExpanded ? styles.expanded : ''
                    }`}
                  />
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
