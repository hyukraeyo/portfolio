'use client';

import { AnimatePresence, m } from 'framer-motion';
import { EXPERIENCE_DATA } from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import ProjectPopover from './ProjectPopover';
import ExpandButton from '../ui/ExpandButton';
import styles from '../Experience.module.scss';

interface ExperienceItemProps {
  item: (typeof EXPERIENCE_DATA)[0];
  index: number;
  expandedItems: number[];
  activePopover: string | null;
  colorOffset: number;
  onToggleExpand: (index: number) => void;
  onTogglePopover: (key: string) => void;
}

export default function ExperienceItem({
  item,
  index,
  expandedItems,
  activePopover,
  colorOffset,
  onToggleExpand,
  onTogglePopover,
}: ExperienceItemProps) {
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
            return (
              <ProjectPopover
                key={pIndex}
                project={project}
                popoverKey={popoverKey}
                isPopoverOpen={activePopover === popoverKey}
                colorOffset={colorOffset}
                onToggle={onTogglePopover}
              />
            );
          })}

          {/* 숨겨진 프로젝트 (내부 더보기) */}
          <AnimatePresence initial={false}>
            {isExpanded && hiddenProjects.length > 0 && (
              <m.div
                key="hidden-projects-container"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={styles.hiddenProjectsContainer}
              >
                {hiddenProjects.map((project, pIndex) => {
                  const actualIndex = 2 + pIndex;
                  const popoverKey = `${index}-${actualIndex}`;
                  return (
                    <ProjectPopover
                      key={`hidden-${pIndex}`}
                      project={project}
                      popoverKey={popoverKey}
                      isPopoverOpen={activePopover === popoverKey}
                      colorOffset={colorOffset}
                      onToggle={onTogglePopover}
                    />
                  );
                })}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 내부 프로젝트 더보기 버튼 */}
      {hasMoreProjects && (
        <ExpandButton
          isExpanded={isExpanded}
          onClick={() => onToggleExpand(index)}
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
}
