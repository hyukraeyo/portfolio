import { Skill } from '@/types';
import styles from './SkillItem.module.scss';

interface SkillItemProps {
  skill: Skill;
}

const levelClasses: Record<Skill['level'], string> = {
  expert: styles.expert,
  advanced: styles.advanced,
  intermediate: styles.intermediate,
  beginner: styles.beginner,
};

export default function SkillItem({ skill }: SkillItemProps) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{skill.name}</span>
        <span className={styles.skillLevel}>{skill.level}</span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressFill} ${levelClasses[skill.level]}`}
        />
      </div>
    </div>
  );
}

