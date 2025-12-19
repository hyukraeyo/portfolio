/**
 * Resume 관련 타입 정의
 */

export interface ProjectItem {
  name: string;
  period: string;
  role: string;
  client: string;
  description?: string[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
  projects?: ProjectItem[];
}
