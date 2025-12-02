'use client';

import { INTERESTS_DATA } from '@/lib/data/home';
import {
  ACADEMIC_DATA,
  EXPERIENCE_DATA,
  TECHNICAL_SKILLS,
} from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import { useState } from 'react';
import FadeIn from './animations/FadeIn';
import StaggerContainer, { StaggerItem } from './animations/StaggerContainer';
import styles from './ResumeGrid.module.scss';

export default function ResumeGrid() {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [isExperienceExpanded, setIsExperienceExpanded] = useState(false);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className={styles.resumeGrid} id="resume">
      <div className={styles.container}>
        {/* Left Column: Education & Experience */}
        <div className={styles.leftColumn}>
          {/* Experience Section */}
          <div className={styles.experienceSection}>
            <FadeIn direction="up" delay={0.2}>
              <h2 className={styles.sectionTitle}>Experience</h2>
            </FadeIn>
            <div
              className={`${styles.list} ${
                !isExperienceExpanded ? styles.collapsed : ''
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
                          {displayedProjects.map((project, pIndex) => (
                            <div key={pIndex} className={styles.projectItem}>
                              <span className={styles.projectName}>
                                {project.name}
                              </span>
                              <span className={styles.projectPeriod}>
                                {project.period}
                              </span>
                            </div>
                          ))}
                          {hasMoreProjects && (
                            <button
                              className={styles.moreButton}
                              onClick={() => toggleExpand(index)}
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
                className={styles.expandSectionButton}
                onClick={() => setIsExperienceExpanded(!isExperienceExpanded)}
              >
                {isExperienceExpanded
                  ? 'Experience 접기 ▲'
                  : 'Experience 더보기 ▼'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Technical Skills */}
        <div className={styles.rightColumn}>
          <div className={styles.bgTextWrapper}>
            {Array.from({ length: 3 }).map((_, i) => (
              <FadeIn
                key={i}
                direction="left"
                delay={0.5 + i * 0.1}
                className={styles.bgText}
              >
                RESUME
              </FadeIn>
            ))}
          </div>

          <div className={styles.skillsContent}>
            <FadeIn direction="up" delay={0.3}>
              <h2 className={styles.sectionTitleSkills}>Technical skills</h2>
            </FadeIn>

            <StaggerContainer className={styles.skillsGrid} delay={0.4}>
              <StaggerItem className={styles.skillCategory}>
                <div className={styles.softwareGrid}>
                  {TECHNICAL_SKILLS.software.map((skill, index) => (
                    <div key={index} className={styles.softwareItem}>
                      {skill}
                    </div>
                  ))}
                </div>
                <div className={styles.codingContent}>
                  <div className={styles.codingGrid}>
                    {TECHNICAL_SKILLS.coding.map((skill, index) => (
                      <span key={index}>{skill}</span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>

            {/* Bottom Tags */}
            <StaggerContainer className={styles.tags} delay={0.6}>
              {TECHNICAL_SKILLS.tags.map((tag, index) => (
                <StaggerItem key={index} className={styles.pill}>
                  {tag}
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Hobbies Section */}
            <div className={styles.hobbiesSection}>
              <FadeIn direction="up" delay={0.6}>
                <h2 className={styles.sectionTitleHobbies}>
                  Hobbies & Interests
                </h2>
              </FadeIn>
              <StaggerContainer className={styles.hobbiesGrid} delay={0.7}>
                {INTERESTS_DATA.hobbies.map((hobby, index) => (
                  <StaggerItem key={index} className={styles.hobbyItem}>
                    <div className={styles.iconWrapper}>{hobby.icon}</div>
                    <span className={styles.hobbyName}>
                      {hobby.name}
                      <br />
                      <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
                        {hobby.description}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Project History Section (Hidden for now, data ready) */}
      {/* 
      <div className={styles.projectHistory}>
        {PROJECT_HISTORY.map(project => (
           ... 
        ))}
      </div> 
      */}
    </section>
  );
}
