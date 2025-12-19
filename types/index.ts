export * from './resume';

export interface Project {
  id: string;
  title: string;
  content: string;
  overview?: string;
  work_period?: string;
  team_composition?: string[];
  role?: string;
  tech_stack?: string[];
  main_contribution?: string;
  achievements?: string;
  reflection?: string;
  created_at: string;
  updated_at: string;
  description?: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}
