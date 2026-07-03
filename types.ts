export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  image: string;
  tools: string[];
  client: string;
  year: string;
  colorPalette: string[]; // hex codes for the project's brand/aesthetic color scheme
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'experience' | 'education';
}

export interface Skill {
  name: string;
  level: number; // 0 - 100 for progress percentage
  category: 'software' | 'creative';
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}
