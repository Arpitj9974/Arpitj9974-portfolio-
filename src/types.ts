export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  year: string;
  category: "Data" | "Web Apps" | "Mobile" | "Internal Tools";
  stack: string[];
  role?: string;
  timeline?: string;
  client?: string;
  outcome?: string;
  problem?: string;
  solution?: string;
  impactStats?: { label: string; value: string }[];
  featured?: boolean;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  tag?: string;
}

export interface CareerInput {
  name: string;
  currentRole: string;
  targetRole: string;
  skills: string;
  values: string;
}

export interface CareerAssessmentResult {
  title: string;
  overview: string;
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  skillsGap: {
    skill: string;
    priority: "High" | "Medium" | "Low";
    actionableStep: string;
  }[];
  roadmap: {
    phase: string;
    duration: string;
    milestones: string[];
    focus: string;
  }[];
  actionPlan: string;
}
