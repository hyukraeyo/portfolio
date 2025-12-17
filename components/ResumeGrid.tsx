'use client';

import { INTERESTS_DATA } from '@/lib/data/home';
import { EXPERIENCE_DATA, TECHNICAL_SKILLS } from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import { useEffect, useState } from 'react';
import FadeIn from './animations/FadeIn';
import StaggerContainer, { StaggerItem } from './animations/StaggerContainer';
import styles from './ResumeGrid.module.scss';

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

  return (
    <section className={styles.resumeGrid} id="resume">
      <div className={styles.container}>
        {/* Experience Section */}
        <div className={styles.experienceWrapper} id="experience">
          <div className={styles.experienceCard}>
            <FadeIn direction="up" delay={0.2}>
              <h2 className={styles.sectionTitle}>경력</h2>
            </FadeIn>
            <div
              className={`${styles.list} ${!isExperienceExpanded ? styles.collapsed : ''
                }`}
            >
              {EXPERIENCE_DATA.slice(
                0,
                isExperienceExpanded ? EXPERIENCE_DATA.length : 1
              ).map((item, index) => {
                const isExpanded = expandedItems.includes(index);
                const hasMoreProjects =
                  item.projects && item.projects.length > 2;
                const displayedProjects =
                  item.projects &&
                  (isExpanded || !hasMoreProjects
                    ? item.projects
                    : item.projects.slice(0, 2));

                return (
                  <div key={index} className={styles.item}>
                    <div className={styles.marker}>✦</div>
                    <div className={styles.content}>
                      <span className={styles.period}>{item.period}</span>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                      <p className={styles.subtitle}>
                        {item.subtitle}
                        {item.subtitle
                          ? ` · ${calculateDuration(item.period)}`
                          : calculateDuration(item.period)}
                      </p>
                      {displayedProjects && (
                        <div className={styles.projectList}>
                          {displayedProjects.map((project, pIndex) => {
                            const popoverKey = `${index}-${pIndex}`;
                            const isPopoverOpen = activePopover === popoverKey;

                            return (
                              <div key={pIndex} className={styles.projectItem}>
                                <div className={styles.detailWrapper}>
                                  <button
                                    className={`${styles.projectNameButton} ${isPopoverOpen ? styles.active : ''
                                      }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleDescription(popoverKey);
                                    }}
                                    aria-expanded={isPopoverOpen}
                                  >
                                    {project.name}
                                    {project.description && (
                                      <span
                                        className={`${styles.hasDetailIndicator} ${styles[`indicatorColor${(pIndex % 3) + 1}`]
                                          }`}
                                      />
                                    )}
                                  </button>
                                  {project.description && isPopoverOpen && (
                                    <div className={styles.descriptionPopover}>
                                      <ul className={styles.projectDescription}>
                                        {project.description.map(
                                          (desc, dIndex) => (
                                            <li key={dIndex}>{desc}</li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                                <span className={styles.projectPeriod}>
                                  {project.period}
                                </span>
                              </div>
                            );
                          })}
                          {hasMoreProjects && (
                            <button
                              className={styles.moreButton}
                              onClick={() => toggleExpand(index)}
                              aria-expanded={isExpanded}
                              aria-label={
                                isExpanded
                                  ? '프로젝트 목록 접기'
                                  : '프로젝트 목록 더보기'
                              }
                            >
                              {isExpanded ? '접기' : '더보기'}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles.expandSectionWrapper}>
              <button
                className={`${styles.expandSectionButton} ${isExperienceExpanded ? styles.expanded : ''
                  }`}
                onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
                aria-expanded={isExperienceExpanded}
                aria-label={
                  isExperienceExpanded ? '경력 목록 접기' : '경력 목록 더보기'
                }
              >
                {isExperienceExpanded ? (
                  <>
                    접기
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 2.5L2 6.5L3.4 7.9L6 5.3L8.6 7.9L10 6.5L6 2.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    더보기
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9.5L2 5.5L3.4 4.1L6 6.7L8.6 4.1L10 5.5L6 9.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={styles.skillsSection} id="skills">
          <FadeIn direction="up" delay={0.3}>
            <h2 className={styles.sectionTitle}>기술 스택</h2>
          </FadeIn>
          <StaggerContainer className={styles.skillsGrid} delay={0.4}>
            {TECHNICAL_SKILLS.map((skill, index) => (
              <StaggerItem key={index} className={styles.skillItem}>
                {skill}
              </StaggerItem>
            ))}
          </StaggerContainer>
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
