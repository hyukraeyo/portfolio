'use client';

import { INTERESTS_DATA } from '@/lib/data/home';
import { EXPERIENCE_DATA, TECHNICAL_SKILLS } from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BlurRevealContainer, { BlurRevealItem } from './animations/BlurReveal';
import FadeIn from './animations/FadeIn';
import StaggerContainer, { StaggerItem } from './animations/StaggerContainer';
import styles from './ResumeGrid.module.scss';

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

const projectItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.2,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.12,
    },
  },
};

const experienceItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.25,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
  exit: {
    opacity: 0,
    y: -10,
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

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleDescription = (projectKey: string) => {
    setActivePopover((prev) => (prev === projectKey ? null : projectKey));
  };

  const closePopover = () => {
    setActivePopover(null);
  };

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
    const visibleProjects =
      item.projects &&
      (isExpanded || !hasMoreProjects
        ? item.projects
        : item.projects.slice(0, 2));
    const hiddenProjects =
      hasMoreProjects && !isExpanded ? item.projects!.slice(2) : [];

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
                  initial={{ opacity: 1 }}
                  layout="position"
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
            <AnimatePresence>
              {isExpanded &&
                hiddenProjects.map((project, pIndex) => {
                  const actualIndex = 2 + pIndex;
                  const popoverKey = `${index}-${actualIndex}`;
                  const isPopoverOpen = activePopover === popoverKey;

                  return (
                    <motion.div
                      key={`hidden-${pIndex}`}
                      className={styles.projectItem}
                      variants={projectItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={pIndex}
                      layout="position"
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
                                styles[`indicatorColor${(actualIndex % 2) + 1}`]
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
            </AnimatePresence>

            {/* 더보기/접기 버튼 */}
            {hasMoreProjects && (
              <motion.button
                className={styles.moreButton}
                onClick={() => toggleExpand(index)}
                aria-expanded={isExpanded}
                aria-label={
                  isExpanded ? '프로젝트 목록 접기' : '프로젝트 목록 더보기'
                }
                variants={buttonVariants}
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                layout="position"
              >
                <motion.span
                  key={isExpanded ? 'collapse' : 'expand'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExpanded
                    ? '접기 ↑'
                    : `더보기 (+${item.projects!.length - 2})`}
                </motion.span>
              </motion.button>
            )}
          </div>
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
                  <AnimatePresence>
                    {isExperienceExpanded &&
                      restExperiences.map((item, idx) => (
                        <motion.div
                          key={idx + 1}
                          className={styles.item}
                          variants={experienceItemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom={idx}
                          layout="position"
                          transition={{
                            layout: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
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
                  </AnimatePresence>
                </div>
              </LayoutGroup>

              {/* 경력 더보기/접기 버튼 */}
              {restExperiences.length > 0 && (
                <div className={styles.expandSectionWrapper}>
                  <motion.button
                    className={`${styles.expandSectionButton} ${
                      isExperienceExpanded ? styles.expanded : ''
                    }`}
                    onClick={() =>
                      setIsExperienceExpanded(!isExperienceExpanded)
                    }
                    aria-expanded={isExperienceExpanded}
                    aria-label={
                      isExperienceExpanded
                        ? '경력 목록 접기'
                        : '경력 목록 더보기'
                    }
                    variants={buttonVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isExperienceExpanded ? 'collapse' : 'expand'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                        }}
                      >
                        {isExperienceExpanded ? (
                          <>
                            접기
                            <motion.svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              animate={{ y: [0, -3, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            >
                              <path
                                d="M6 2.5L2 6.5L3.4 7.9L6 5.3L8.6 7.9L10 6.5L6 2.5Z"
                                fill="currentColor"
                              />
                            </motion.svg>
                          </>
                        ) : (
                          <>
                            더보기
                            <motion.svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              animate={{ y: [0, 3, 0] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 1,
                              }}
                            >
                              <path
                                d="M6 9.5L2 5.5L3.4 4.1L6 6.7L8.6 4.1L10 5.5L6 9.5Z"
                                fill="currentColor"
                              />
                            </motion.svg>
                          </>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
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
