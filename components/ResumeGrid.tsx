'use client';

import { INTERESTS_DATA } from '@/lib/data/home';
import { EXPERIENCE_DATA, TECHNICAL_SKILLS } from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import BlurRevealContainer, { BlurRevealItem } from './animations/BlurReveal';
import FadeIn from './animations/FadeIn';
import StaggerContainer, { StaggerItem } from './animations/StaggerContainer';
import styles from './ResumeGrid.module.scss';
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

const buttonVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

export default function ResumeGrid() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);

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

  // 첫 번째 경력 데이터 (항상 표시)
  const firstExperience = EXPERIENCE_DATA[0];
  // 나머지 경력 데이터 (펼쳤을 때만 표시)
  const restExperiences = EXPERIENCE_DATA.slice(1);

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
                        type: 'spring',
                        stiffness: 120,
                        damping: 20,
                        mass: 1.2,
                      },
                      opacity: {
                        duration: 0.4,
                        ease: 'easeOut',
                      },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: {
                      height: {
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      },
                      opacity: {
                        duration: 0.2,
                      },
                    },
                  }}
                  style={{ overflow: 'hidden' }}
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
    <section className={styles.resumeGrid} id="resume">
      <div className={styles.container}>
        {/* Experience Section */}
        <div className={styles.experienceWrapper} id="experience">
          <FadeIn
            direction="up"
            delay={0.2}
            fullWidth
            className={styles.experienceFadeIn}
          >
            <div className={styles.experienceCard}>
              <h2 className={styles.sectionTitle}>경력</h2>
              <LayoutGroup>
                <div className={styles.list}>
                  {/* 첫 번째 경력 (항상 표시) */}
                  <motion.div className={styles.item} layout="position">
                    <motion.div
                      className={styles.marker}
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                      }}
                    >
                      ✦
                    </motion.div>
                    {renderExperienceItem(firstExperience, 0)}
                  </motion.div>

                  {/* 나머지 경력 (펼쳤을 때만 표시) */}
                  <AnimatePresence initial={false}>
                    {isExperienceExpanded && restExperiences.length > 0 && (
                      <motion.div
                        key="rest-experiences-container"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: 1,
                          height: 'auto',
                          transition: {
                            height: {
                              type: 'spring',
                              stiffness: 120,
                              damping: 20,
                              mass: 1.2,
                            },
                            opacity: {
                              duration: 0.4,
                              ease: 'easeOut',
                            },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          transition: {
                            height: {
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            },
                            opacity: {
                              duration: 0.2,
                            },
                          },
                        }}
                        style={{ overflow: 'hidden' }}
                        className={styles.restExperiencesContainer}
                      >
                        {restExperiences.map((item, idx) => (
                          <motion.div
                            key={idx + 1}
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
                            {renderExperienceItem(item, idx + 1)}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </LayoutGroup>

              {/* 경력 더보기/접기 버튼 */}
              {restExperiences.length > 0 && (
                <div className={styles.expandSectionWrapper}>
                  <ExpandButton
                    isExpanded={isExperienceExpanded}
                    onClick={() =>
                      setIsExperienceExpanded(!isExperienceExpanded)
                    }
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

        {/* Skills Section */}
        <div className={styles.skillsSection} id="skills">
          <FadeIn direction="up" delay={0.3}>
            <h2 className={styles.sectionTitle}>기술 스택</h2>
          </FadeIn>
          <BlurRevealContainer className={styles.skillsGrid} delay={0.2}>
            {TECHNICAL_SKILLS.map((skill, index) => (
              <BlurRevealItem key={index} className={styles.skillItem}>
                {skill}
              </BlurRevealItem>
            ))}
          </BlurRevealContainer>
        </div>

        {/* Hobbies Section */}
        <div className={styles.hobbiesSection} id="hobbies">
          <FadeIn direction="up" delay={0.6}>
            <h2 className={styles.sectionTitle}>취미 & 관심사</h2>
          </FadeIn>
          <StaggerContainer className={styles.hobbiesGrid} delay={0.7}>
            {INTERESTS_DATA.hobbies.map((hobby, index) => (
              <StaggerItem key={index} className={styles.hobbyItem}>
                <div className={styles.iconWrapper}>{hobby.icon}</div>
                <span className={styles.hobbyName}>{hobby.name}</span>
                <span className={styles.hobbyDesc}>{hobby.description}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
