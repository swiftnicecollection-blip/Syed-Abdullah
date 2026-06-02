export interface Skill {
  name: string;
  percentage: number;
  icon: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  responsibilities: string[];
}

export interface Language {
  name: string;
  code: string;
  proficiency: string;
  percentage: number;
}

export interface NavLink {
  label: string;
  href: string;
}
